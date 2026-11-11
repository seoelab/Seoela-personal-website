/* =============================================================================
   Job-market design: behaviour layer for the Wowchemy theme.
   Loaded from layouts/partials/hooks/body-end/job-market.html (bundled after job-market-masks.js).
   Every feature checks for its own markup first, so it is safe on every page.
   Styles live in assets/scss/custom.scss; every class is prefixed `jm-`.
   ============================================================================= */
(function () {
  "use strict";

  var root = document.documentElement, body = document.body;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia && matchMedia("(pointer: coarse)").matches;
  var MASKS = window.JM_MASKS;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var reEsc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  var icon = function (id) { return '<svg class="jm-ic"><use href="#jm-i-' + id + '"/></svg>'; };
  var slug = function (s) { return String(s).toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); };
  function cssVar(n) { return getComputedStyle(body).getPropertyValue(n).trim(); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; }

  /* ---------- Theme changes: Wowchemy toggles the `dark` class on <body> ---------- */
  new MutationObserver(function () { document.dispatchEvent(new Event("jm:theme")); }).observe(body, { attributes: true, attributeFilter: ["class"] });

  /* ---------- Toast + back-to-top ---------- */
  var toastEl = el("div"); toastEl.id = "jm-toast"; toastEl.setAttribute("role", "status"); toastEl.setAttribute("aria-live", "polite"); body.appendChild(toastEl);
  var toastT;
  function toast(msg) { toastEl.textContent = msg; toastEl.classList.add("jm-show"); clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove("jm-show"); }, 3200); }
  var toTop = el("button", "jm-icon-btn", icon("up")); toTop.id = "jm-top"; toTop.type = "button"; toTop.setAttribute("aria-label", "Back to top"); body.appendChild(toTop);
  toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ---------- Collapse toggles (abstracts, rules, schedule parts) ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-jm-toggle]"); if (!b) return;
    var t = document.getElementById(b.getAttribute("aria-controls")); if (!t) return;
    var open = !t.classList.contains("jm-open");
    t.classList.toggle("jm-open", open); b.setAttribute("aria-expanded", open);
  });

  /* ======================================================================
     Trade-route map: ONE fixed canvas behind every page.
     Dots are the land mask; arcs are shipping routes. Motion is limited to the side margins
     so nothing moves behind text.
     ====================================================================== */
  var NODES = {
    mexico_city: [-99.13, 19.43, 1], manzanillo: [-104.32, 19.05], veracruz: [-96.13, 19.19], laredo: [-99.5, 27.5], houston: [-95.37, 29.76],
    bloomington: [-86.53, 39.17, 1], rotterdam: [4.48, 51.92, 1], shanghai: [121.47, 31.23, 1], durban: [31.03, -29.86, 1]
  };
  var ROUTES = [["manzanillo", "shanghai"], ["veracruz", "rotterdam"], ["laredo", "bloomington"], ["mexico_city", "houston"],
                ["durban", "rotterdam"], ["durban", "shanghai"], ["bloomington", "durban"], ["houston", "rotterdam"]];

  (function bgViz() {
    if (!MASKS || !MASKS.world) return;
    var canvas = el("canvas"); canvas.id = "jm-bg"; canvas.setAttribute("aria-hidden", "true"); body.insertBefore(canvas, body.firstChild);
    var ctx = canvas.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var M = MASKS.world, W = 0, H = 0, ox = 0, oy = 0, ww = 0, wh = 0, base = null, running = false, raf = 0, t0 = performance.now();
    var px = 0, py = 0, tpx = 0, tpy = 0, colDot = "", colRoute = "", colComet = "", colL = 0, colR = 0;
    var arcs = ROUTES.map(function (r, i) { return { a: NODES[r[0]], b: NODES[r[1]], phase: (i * 0.37) % 1, speed: 0.1 + (i % 3) * 0.028 }; });

    function side(x) { var d = x < colL ? colL - x : (x > colR ? x - colR : 0); return Math.min(1, d / 50); }
    function proj(lon, lat) { return [ox + (lon - M.lon0) / (M.lon1 - M.lon0) * ww, oy + (M.lat1 - lat) / (M.lat1 - M.lat0) * wh]; }
    function readColors() { colDot = cssVar("--jm-bg-dot"); colRoute = cssVar("--jm-bg-route"); colComet = cssVar("--jm-bg-comet"); }
    function layout() {
      W = window.innerWidth; H = window.innerHeight; if (!W || !H) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var aspect = (M.lon1 - M.lon0) / (M.lat1 - M.lat0);
      ww = Math.max(W * 1.1, H * 0.82 * aspect); wh = ww / aspect;
      var focusLon = W < 700 ? -38 : 8, focusLat = 14;
      ox = W / 2 - (focusLon - M.lon0) / (M.lon1 - M.lon0) * ww;
      oy = H / 2 - (M.lat1 - focusLat) / (M.lat1 - M.lat0) * wh;
      var cwid = Math.min(1100, W), pad = W <= 640 ? 20 : 28; colL = (W - cwid) / 2 + pad; colR = W - colL;
      readColors(); drawBase();
    }
    function drawBase() {
      base = document.createElement("canvas"); base.width = canvas.width; base.height = canvas.height;
      var b = base.getContext("2d"); b.scale(dpr, dpr); b.fillStyle = colDot;
      var cw = ww / M.cols, ch = wh / M.rows, r = Math.max(1.1, cw * 0.26);
      for (var y = 0; y < M.rows; y++) {
        var row = M.data[y], yy = oy + (y + 0.5) * ch; if (yy < -6 || yy > H + 6) continue;
        for (var x = 0; x < M.cols; x++) {
          if (row.charCodeAt(x) !== 49) continue;
          var xx = ox + (x + 0.5) * cw; if (xx < -6 || xx > W + 6) continue;
          b.globalAlpha = (xx > colL && xx < colR) ? 0.7 : 1;
          b.beginPath(); b.arc(xx, yy, r, 0, 6.2832); b.fill();
        }
      }
    }
    function bez(p0, c, p1, t) { var u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]; }
    function geom(a, b) {
      var p0 = proj(a[0], a[1]), p1 = proj(b[0], b[1]), d = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      return { p0: p0, p1: p1, c: [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2 - d * 0.3] };
    }
    function frame(now) {
      if (!base) return;
      var t = (now - t0) / 1000;
      px += (tpx - px) * 0.05; py += (tpy - py) * 0.05;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, px * dpr, py * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, px * dpr, py * dpr);
      arcs.forEach(function (arc) {
        var g = geom(arc.a, arc.b);
        var path = function () { ctx.beginPath(); ctx.moveTo(g.p0[0], g.p0[1]); ctx.quadraticCurveTo(g.c[0], g.c[1], g.p1[0], g.p1[1]); };
        ctx.strokeStyle = colRoute; ctx.lineWidth = 1; ctx.setLineDash([2, 6]);
        ctx.globalAlpha = 0.28; path(); ctx.stroke();            /* faint where text lives */
        ctx.save(); ctx.beginPath(); ctx.rect(-40, -40, colL + 40, H + 80); ctx.rect(colR, -40, W - colR + 40, H + 80); ctx.clip();
        ctx.globalAlpha = 1; path(); ctx.stroke(); ctx.restore(); /* full strength in the margins */
        ctx.setLineDash([]); ctx.globalAlpha = 1;
        if (reduce) return;
        var p = (((t * arc.speed + arc.phase) % 1.4) + 1.4) % 1.4;
        for (var k = 0; k < 18; k++) {
          var tk = p - k * 0.013; if (tk < 0 || tk > 1) continue;
          var a = bez(g.p0, g.c, g.p1, tk), b = bez(g.p0, g.c, g.p1, Math.min(1, tk + 0.013)), f = side((a[0] + b[0]) / 2); if (f <= 0) continue;
          ctx.strokeStyle = "rgba(" + colComet + "," + ((1 - k / 18) * 0.6 * f).toFixed(3) + ")"; ctx.lineWidth = 2 - k * 0.06;
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        }
        if (p <= 1) { var h = bez(g.p0, g.c, g.p1, p), fh = side(h[0]); if (fh > 0) { ctx.fillStyle = "rgba(" + colComet + "," + (0.75 * fh).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(h[0], h[1], 2.4, 0, 6.2832); ctx.fill(); } }
      });
      Object.keys(NODES).forEach(function (k) {
        var n = NODES[k], p = proj(n[0], n[1]), sf = side(p[0]);
        ctx.fillStyle = "rgba(" + colComet + "," + (0.18 + 0.37 * sf).toFixed(3) + ")"; ctx.beginPath(); ctx.arc(p[0], p[1], n[2] ? 3 : 2, 0, 6.2832); ctx.fill();
        if (n[2] && !reduce && sf > 0) {
          var ph = (((t * 0.45 + p[0] * 0.003) % 1) + 1) % 1;
          ctx.strokeStyle = "rgba(" + colComet + "," + ((1 - ph) * 0.35 * sf).toFixed(3) + ")"; ctx.lineWidth = 1.1;
          ctx.beginPath(); ctx.arc(p[0], p[1], 3 + ph * 13, 0, 6.2832); ctx.stroke();
        }
      });
    }
    function loop(now) { if (!running) return; frame(now); raf = requestAnimationFrame(loop); }
    function start() { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    function refresh() { layout(); frame(performance.now()); }

    layout(); frame(performance.now()); start();
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(refresh, 120); });
    document.addEventListener("jm:theme", function () { readColors(); drawBase(); frame(performance.now()); });
    if (!coarse && !reduce) window.addEventListener("pointermove", function (e) { tpx = (e.clientX / window.innerWidth - 0.5) * -12; tpy = (e.clientY / window.innerHeight - 0.5) * -8; });
  })();

  /* ======================================================================
     Cycling progress road under the navbar (rider moves with scroll)
     ====================================================================== */
  var fill, rider, wheels = [];
  (function road() {
    var nav = $("#navbar-main"); if (!nav) return;
    var r = el("div", "jm-road"); r.setAttribute("aria-hidden", "true");
    r.innerHTML = '<div class="jm-road-fill"></div><div class="jm-rider"><svg viewBox="0 0 40 24">' +
      '<g class="jm-wheel"><circle cx="8" cy="17" r="6"/><path d="M8 11v12M2 17h12"/></g>' +
      '<g class="jm-wheel"><circle cx="32" cy="17" r="6"/><path d="M32 11v12M26 17h12"/></g>' +
      '<path d="M8 17 17 17 14 9 28 9 32 17M17 17 28 9M12 8h5M28 9l2-3h3"/><path d="M14 8 21 12 18 17"/><path d="M14 8 23 4 29 6"/>' +
      '<circle class="jm-head" cx="25.2" cy="1.6" r="2.1"/></svg></div>';
    nav.appendChild(r);
    fill = $(".jm-road-fill", r); rider = $(".jm-rider", r); wheels = $$(".jm-wheel", r);
  })();
  function onScroll() {
    var max = root.scrollHeight - root.clientHeight, y = root.scrollTop || window.pageYOffset, p = max > 0 ? Math.min(1, y / max) : 0;
    if (rider) {
      var track = rider.parentNode.clientWidth, rw = rider.offsetWidth;
      fill.style.width = (p * track) + "px"; rider.style.transform = "translateX(" + (p * (track - rw)) + "px)";
      var deg = y * 0.9; wheels.forEach(function (w) { w.style.transform = "rotate(" + deg + "deg)"; });
    }
    toTop.classList.toggle("jm-show", y > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll); onScroll();

  /* ---------- Reveal on scroll ---------- */
  (function reveal() {
    var els = $$(".jm-reveal"); if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("jm-in"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("jm-in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
    window.addEventListener("beforeprint", function () { els.forEach(function (e) { e.classList.add("jm-in"); }); });
  })();

  /* ======================================================================
     Page change: a trade route is drawn across the screen, then the next page loads.
     (Real page loads, so every URL still works on its own.)
     ====================================================================== */
  var fx, fxSvg, fxPath, fxBase, fxDot, fxHalo;
  function buildFx() {
    if (fx) return;
    fx = el("div"); fx.id = "jm-fx"; fx.setAttribute("aria-hidden", "true");
    fx.innerHTML = '<svg id="jm-fx-svg"><path class="jm-base"/><path class="jm-draw"/><circle class="jm-halo" r="14"/><circle class="jm-pt" r="5"/></svg>';
    body.appendChild(fx);
    fxSvg = $("svg", fx); fxBase = $(".jm-base", fx); fxPath = $(".jm-draw", fx); fxDot = $(".jm-pt", fx); fxHalo = $(".jm-halo", fx);
  }
  function routePath() {
    var w = window.innerWidth, h = window.innerHeight;
    fxSvg.setAttribute("viewBox", "0 0 " + w + " " + h);
    var d = "M -30 " + (h * 0.72) + " C " + (w * 0.28) + " " + (h * 0.1) + ", " + (w * 0.66) + " " + (h * 0.1) + ", " + (w + 30) + " " + (h * 0.58);
    fxPath.setAttribute("d", d); fxBase.setAttribute("d", d);
    return fxPath.getTotalLength();
  }
  function drawTo(len, q) {
    fxPath.style.strokeDashoffset = len * (1 - q);
    var pt = fxPath.getPointAtLength(len * q);
    fxDot.setAttribute("cx", pt.x); fxDot.setAttribute("cy", pt.y); fxHalo.setAttribute("cx", pt.x); fxHalo.setAttribute("cy", pt.y);
  }
  function leaveTo(url) {
    buildFx(); var len = routePath(); fxPath.style.strokeDasharray = len; fxPath.style.strokeDashoffset = len;
    fx.classList.add("jm-on"); var t0 = performance.now(), D = 420, gone = false;
    try { sessionStorage.setItem("jmNav", "1"); } catch (e) {}
    (function step(now) {
      var p = Math.min(1, (now - t0) / D), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      drawTo(len, Math.min(1, e * 1.2)); fx.style.opacity = Math.min(1, p / 0.5);
      if (p < 1) requestAnimationFrame(step); else if (!gone) { gone = true; window.location.href = url; }
    })(t0);
  }
  (function arrive() {
    var arriving = root.classList.contains("jm-arriving");
    try { sessionStorage.removeItem("jmNav"); } catch (e) {}
    if (!arriving) return;
    buildFx(); var len = routePath(); fxPath.style.strokeDasharray = len; drawTo(len, 1);
    fx.classList.add("jm-on"); fx.style.opacity = 1; root.classList.remove("jm-arriving");
    var t0 = performance.now(), D = 380;
    (function step(now) {
      var p = Math.min(1, (now - t0) / D); fx.style.opacity = 1 - p;
      if (p < 1) requestAnimationFrame(step); else { fx.classList.remove("jm-on"); fx.style.opacity = ""; }
    })(t0);
  })();
  window.addEventListener("pageshow", function (e) { if (e.persisted && fx) { fx.classList.remove("jm-on"); fx.style.opacity = ""; root.classList.remove("jm-arriving"); } });
  if (!reduce) document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    if (a.hasAttribute("download") || a.hasAttribute("data-toggle") || a.hasAttribute("data-target") && a.getAttribute("href").charAt(0) === "#") return;
    var u; try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin || !/^https?:$/.test(u.protocol)) return;
    if (/\.(pdf|zip|docx?|xlsx?|pptx?|csv|png|jpe?g|gif|svg)$/i.test(u.pathname)) return;
    if (u.pathname === location.pathname && u.search === location.search) return; /* same page: hash scroll only */
    e.preventDefault(); leaveTo(u.href);
  });

  /* ======================================================================
     Home page: intro, tilt, cycling map, email
     ====================================================================== */
  var portrait = $("#jm-portrait");
  if (portrait) {
    var h = $("#jm-name");
    if (h && !h.getAttribute("data-jm-split")) {
      var text = h.textContent; h.setAttribute("aria-label", text); h.setAttribute("data-jm-split", "1"); h.textContent = ""; var k = 0;
      text.split("").forEach(function (ch) {
        var s = el("span"); s.setAttribute("aria-hidden", "true");
        if (ch === " ") s.className = "jm-sp"; else { s.className = "jm-ch"; s.style.setProperty("--k", k++); s.textContent = ch; }
        h.appendChild(s);
      });
    }
    var introT;
    var finish = function () { root.setAttribute("data-jm-intro", "0"); try { localStorage.setItem("jmIntroSeen", "1"); } catch (e) {} };
    if (root.getAttribute("data-jm-intro") === "1") introT = setTimeout(finish, 3200);
    var avBtn = $("#jm-avatar-btn");
    if (avBtn) avBtn.addEventListener("click", function () {
      if (reduce) return;
      root.setAttribute("data-jm-intro", "0"); void root.offsetWidth; root.setAttribute("data-jm-intro", "1");
      clearTimeout(introT); introT = setTimeout(finish, 3200);
    });
    var av = $(".jm-avatar", portrait);
    if (av && !coarse && !reduce) {
      portrait.addEventListener("pointermove", function (e) {
        var r = av.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        av.style.setProperty("--ry", ((x - 0.5) * 12).toFixed(2) + "deg"); av.style.setProperty("--rx", ((0.5 - y) * 12).toFixed(2) + "deg");
        av.style.setProperty("--mx", (x * 100) + "%"); av.style.setProperty("--my", (y * 100) + "%"); portrait.classList.add("jm-tilting");
      });
      portrait.addEventListener("pointerleave", function () { av.style.setProperty("--rx", "0deg"); av.style.setProperty("--ry", "0deg"); portrait.classList.remove("jm-tilting"); });
    }
  }

  /* Cycling map: dotted North America + pins linked to the city chips */
  (function cyclingMap() {
    var box = $("#jm-nomap"), data = $("#jm-cities-data"); if (!box || !data || !MASKS || !MASKS.na) return;
    var cities; try { cities = JSON.parse(data.textContent); } catch (e) { return; }
    var N = MASKS.na, cv = $("canvas", box), ctx = cv.getContext("2d"), pins = [], chips = $$(".jm-cities li");
    cities.forEach(function (c, i) {
      var b = el("button", "jm-pin" + (c.ride ? " jm-ride" : "")); b.type = "button"; b.setAttribute("aria-label", c.name);
      b.style.left = ((c.lon - N.lon0) / (N.lon1 - N.lon0) * 100) + "%"; b.style.top = ((N.lat1 - c.lat) / (N.lat1 - N.lat0) * 100) + "%";
      b.style.setProperty("--d", (i * 70) + "ms"); b.innerHTML = '<span class="jm-tip">' + esc(c.name) + "</span>"; box.appendChild(b); pins.push(b);
    });
    function hot(i, on) { if (chips[i]) chips[i].classList.toggle("jm-hot", on); if (pins[i]) pins[i].classList.toggle("jm-hot", on); }
    chips.forEach(function (c, i) { c.addEventListener("mouseenter", function () { hot(i, true); }); c.addEventListener("mouseleave", function () { hot(i, false); }); });
    pins.forEach(function (p, i) { ["mouseenter", "focus"].forEach(function (ev) { p.addEventListener(ev, function () { hot(i, true); }); }); ["mouseleave", "blur"].forEach(function (ev) { p.addEventListener(ev, function () { hot(i, false); }); }); });
    function draw() {
      var r = box.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2); if (!r.width) return;
      cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0); ctx.clearRect(0, 0, r.width, r.height);
      ctx.fillStyle = cssVar("--jm-viz-dot"); var cw = r.width / N.cols, ch = r.height / N.rows, rad = Math.max(1, cw * 0.32);
      for (var y = 0; y < N.rows; y++) for (var x = 0; x < N.cols; x++) { if (N.data[y].charCodeAt(x) !== 49) continue; ctx.beginPath(); ctx.arc((x + 0.5) * cw, (y + 0.5) * ch, rad, 0, 6.2832); ctx.fill(); }
    }
    window.addEventListener("resize", draw); document.addEventListener("jm:theme", draw);
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es, io) { if (es[0].isIntersecting) { draw(); box.classList.add("jm-in"); io.disconnect(); } }, { threshold: 0.25 }).observe(box);
    else { draw(); box.classList.add("jm-in"); }
  })();

  /* Email addresses are assembled in the browser (kept out of the page source) */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    try { var ta = el("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0"; body.appendChild(ta); ta.select(); var ok = document.execCommand("copy"); ta.remove(); return ok; } catch (e) { return false; }
  }
  $$(".jm-email-link").forEach(function (s) {
    var email; try { email = atob(s.dataset.u) + "@" + atob(s.dataset.d); } catch (e) { s.textContent = "Contact via the department directory"; return; }
    var a = el("a"); a.href = "mailto:" + email; a.textContent = email; a.rel = "nofollow";
    var row = s.parentNode; s.replaceWith(a);
    var b = el("button", "jm-copy", icon("copy") + "Copy"); b.type = "button"; b.setAttribute("aria-label", "Copy " + email);
    b.addEventListener("click", function () { copyText(email).then(function (ok) { toast(ok ? "Copied " + email : "Could not copy. Please select the address manually."); }); });
    row.appendChild(b);
  });

  /* ======================================================================
     Research page: search + type filter
     ====================================================================== */
  (function research() {
    var rootEl = $("[data-jm-research]"); if (!rootEl) return;
    var listEl = $("#jm-list"), tabsEl = $("#jm-tabs"), countEl = $("#jm-result-count"), expandBtn = $("#jm-expand-all"), qEl = $("#jm-q"), qBox = $("#jm-searchbox"), emptyEl = $("#jm-empty");
    var cards = $$(".jm-entry", listEl), TAB_NAMES = {};
    $$("[data-jm-cat]", tabsEl).forEach(function (b) { TAB_NAMES[b.dataset.jmCat] = b.firstChild.textContent; });
    cards.forEach(function (c) {
      c._hay = c.textContent.replace(/\s+/g, " ").toLowerCase();
      $$("[data-jm-hl]", c).forEach(function (n) { n._orig = n.innerHTML; });
    });
    var state = { cat: "all", q: "", expand: false };
    var params = new URLSearchParams(location.search); if (params.get("type") && TAB_NAMES[params.get("type")]) state.cat = params.get("type");
    function terms() { return state.q.toLowerCase().split(/\s+/).filter(Boolean); }
    function highlight(c, ts) {
      $$("[data-jm-hl]", c).forEach(function (n) {
        n.innerHTML = n._orig; if (!ts.length) return;
        var re = new RegExp("(" + ts.map(reEsc).join("|") + ")", "gi");
        var walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), nodes = [], t; while ((t = walker.nextNode())) nodes.push(t);
        nodes.forEach(function (tn) {
          if (!re.test(tn.nodeValue)) return; re.lastIndex = 0;
          var span = el("span"); span.innerHTML = esc(tn.nodeValue).replace(new RegExp("(" + ts.map(function (x) { return reEsc(esc(x)); }).join("|") + ")", "gi"), "<mark>$1</mark>");
          tn.replaceWith.apply(tn, Array.prototype.slice.call(span.childNodes));
        });
      });
    }
    function setCollapse(c, open) {
      var col = $(".jm-collapse", c), btn = $("[data-jm-toggle]", c); if (!col) return;
      col.classList.toggle("jm-open", open); if (btn) btn.setAttribute("aria-expanded", open);
    }
    function render() {
      var ts = terms(), hits = cards.filter(function (c) { return ts.every(function (t) { return c._hay.indexOf(t) > -1; }); });
      var counts = { all: hits.length };
      hits.forEach(function (c) { counts[c.dataset.jmType] = (counts[c.dataset.jmType] || 0) + 1; });
      $$("[data-jm-cat]", tabsEl).forEach(function (b) {
        var n = counts[b.dataset.jmCat] || 0; $(".jm-n", b).textContent = n; b.classList.toggle("jm-zero", !n); b.setAttribute("aria-pressed", state.cat === b.dataset.jmCat);
      });
      var shown = 0;
      cards.forEach(function (c, i) {
        var ok = hits.indexOf(c) > -1 && (state.cat === "all" || c.dataset.jmType === state.cat);
        c.hidden = !ok; if (ok) { c.style.setProperty("--n", Math.min(shown, 8)); shown++; }
        highlight(c, ok ? ts : []);
        if (state.expand && ok) setCollapse(c, true);
      });
      var total = cards.length;
      countEl.textContent = shown === total ? "Showing all " + total + " items" : "Showing " + shown + " of " + total + " items";
      emptyEl.hidden = shown > 0;
      if (!shown) $("#jm-empty-msg").textContent = state.q ? "Nothing found for “" + state.q + "”" + (state.cat !== "all" ? " in " + TAB_NAMES[state.cat].toLowerCase() : "") + ". " : "Nothing in this category yet. ";
      expandBtn.hidden = !cards.some(function (c) { return !c.hidden && $(".jm-collapse", c); });
      expandBtn.textContent = state.expand ? "Collapse all abstracts" : "Expand all abstracts";
    }
    tabsEl.addEventListener("click", function (e) { var b = e.target.closest("[data-jm-cat]"); if (!b) return; state.cat = b.dataset.jmCat; render(); });
    qEl.addEventListener("input", function () { state.q = qEl.value.trim(); qBox.classList.toggle("jm-has-text", !!qEl.value); render(); });
    function clearSearch() { qEl.value = ""; state.q = ""; qBox.classList.remove("jm-has-text"); render(); }
    $("#jm-q-clear").addEventListener("click", function () { clearSearch(); qEl.focus(); });
    qEl.addEventListener("keydown", function (e) { if (e.key === "Escape" && qEl.value) { e.stopPropagation(); clearSearch(); } });
    expandBtn.addEventListener("click", function () { state.expand = !state.expand; if (!state.expand) cards.forEach(function (c) { setCollapse(c, false); }); render(); });
    $("#jm-reset-all").addEventListener("click", function () { state.cat = "all"; state.expand = false; clearSearch(); });
    document.addEventListener("keydown", function (e) {
      var tag = (e.target.tagName || "").toLowerCase();
      if (e.key === "/" && tag !== "input" && tag !== "textarea") { e.preventDefault(); qEl.focus(); }
    });
    render();
  })();

  /* ======================================================================
     Teaching page: institution tabs
     ====================================================================== */
  (function teachingTabs() {
    var tabs = $$("#jm-teach-tabs [role=tab]"); if (!tabs.length) return;
    function select(btn, focus) {
      tabs.forEach(function (b) { var on = b === btn; b.setAttribute("aria-selected", on); b.tabIndex = on ? 0 : -1; document.getElementById(b.getAttribute("aria-controls")).hidden = !on; });
      if (focus) btn.focus();
    }
    tabs.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b); });
      b.addEventListener("keydown", function (e) {
        var j = null;
        if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
        if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
        if (e.key === "Home") j = 0;
        if (e.key === "End") j = tabs.length - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  })();

  /* ======================================================================
     ECON E-303 schedule: expand / collapse all
     ====================================================================== */
  (function schedule() {
    var btn = $("#jm-sched-toggle"); if (!btn) return;
    var parts = function () { return $$("#jm-schedule .jm-collapse"); };
    var allOpen = function () { return parts().every(function (c) { return c.classList.contains("jm-open"); }); };
    function sync() { btn.textContent = allOpen() ? "Collapse all" : "Expand all"; }
    btn.addEventListener("click", function () {
      var open = !allOpen();
      $$("#jm-schedule .jm-part").forEach(function (p) { $(".jm-collapse", p).classList.toggle("jm-open", open); $(".jm-part-head", p).setAttribute("aria-expanded", open); });
      sync();
    });
    $("#jm-schedule").addEventListener("click", function () { setTimeout(sync, 0); });
  })();

  /* ======================================================================
     Long-form pages (INEGI guide, course page): table of contents + tidy-ups
     ====================================================================== */
  (function prose() {
    var article = $(".jm-prose"); if (!article) return;
    $$("table", article).forEach(function (t) {
      var heads = $$("thead th", t);
      if (heads.length && heads.every(function (th) { return !th.textContent.trim(); })) { t.classList.add("jm-info-table"); var thead = $("thead", t); if (thead) thead.remove(); }
      if (!t.parentNode.classList.contains("jm-table-wrap")) { var w = el("div", "jm-table-wrap"); t.parentNode.insertBefore(w, t); w.appendChild(t); }
    });
    $$("iframe", article).forEach(function (f) {
      if (f.parentNode.classList.contains("jm-map-embed")) return;
      var w = el("div", "jm-map-embed"); f.parentNode.insertBefore(w, f); w.appendChild(f);
    });
    $$("a[href]", article).forEach(function (a) {
      var u; try { u = new URL(a.href, location.href); } catch (e) { return; }
      if (u.origin !== location.origin) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      var p = a.parentNode;
      if (/\.pdf$/i.test(u.pathname) && p.tagName === "P" && p.childNodes.length === 1) { a.className = "jm-btn jm-btn-primary"; p.className = "jm-actions"; a.textContent = a.textContent.replace(/[\[\]↓]/g, "").trim(); a.insertAdjacentHTML("afterbegin", icon("download")); }
    });
    var toc = $("#jm-toc"); if (!toc) return;
    var heads = $$("h2", article);
    toc.innerHTML = heads.map(function (h) { h.id = h.id || "g-" + slug(h.textContent); return '<li><a href="#' + h.id + '" data-target="' + h.id + '">' + esc(h.textContent) + "</a></li>"; }).join("");
    toc.addEventListener("click", function (e) {
      var a = e.target.closest("a"); if (!a) return; e.preventDefault();
      document.getElementById(a.dataset.target).scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) $$("#jm-toc a").forEach(function (a) { a.classList.toggle("jm-active", a.dataset.target === e.target.id); }); });
      }, { rootMargin: "-20% 0px -70% 0px" });
      heads.forEach(function (h) { io.observe(h); });
    }
  })();
})();
