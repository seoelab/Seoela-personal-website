# Leave the homepage title empty to use the site title
title: 
date: 2022-10-24
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: Biography
      # Choose a user profile to display (a folder name within content/authors/)
      username: admin

  - block: experience
    id: experience
    content:
      title: Short CV
      subtitle: ''
      date_format: Jan 2006
      experience:
        - title: Assistant Professor for International Macroeconomics
          company: University of Tuebingen
          company_url: https://uni-tuebingen.de/en/19615
          company_logo: ''
          location: Tübingen, Germany
          date_start: '2021-04-01'
          date_end: ''
          description: |2-
              Responsibilities include:
              * Research
              * Teaching
              * PhD Supervision

        - title: Dynare Developer
          company: Dynare Team
          company_url: https://www.dynare.org/about/#team
          company_logo: ''
          location: CEPREMAP, France
          date_start: '2019-03-01'
          date_end: ''
          description: |2-
              Responsibilities include:
              * Analytic Derivatives
              * Bug fixing
              * Identification Toolbox
              * Method of Moments Estimation Toolbox

        - title: Consultancy
          company: OECD project on evaluation and analytical capacity building of the Federal Planning Bureau
          company_url: https://www.plan.be/index.php?lang=en
          company_logo: ''
          location: Brussels, Belgium
          date_start: '2023-05-01'
          date_end: '2023-12-01'
          description: Consulted Dynare-related methods and optimizations for DynEMItE model.

        - title: Referee Service
          company: ''
          company_url: ''
          company_logo: ''
          location: ''
          date_start: '2012-01-01'
          date_end: ''
          description: Computational Statistics and Data Analysis, Economic Modelling, Journal of Econometrics, Journal of Economic Dynamics and Control, Junior Management Science, National Science Centre Poland, The B.E. Journal of Macroeconomics

        - title: Principal Investigator (DFG funded)
          company: Deutsche Forschungsgesellschaft (DFG)
          company_url: https://gepris.dfg.de/gepris/projekt/411754673?language=en
          company_logo: ''
          location: Münster/Tübingen, Germany
          date_start: '2019-04-01'
          date_end: '2022-07-01'
          description: |2-
              DFG Project 411754673: *Identification and Estimation of Dynamic Stochastic General Equilibrium Models: Skewness Matters*
              
              Responsibilities include:
              * PhD Supervision
              * Project Management
              * Research

        - title: Full Professor in Econometrics
          company: University of Muenster
          company_url: https://www.wiwi.uni-muenster.de/cqe/de/center/personen/willi-mutschler-1
          company_logo: ''
          location: Münster, Germany
          date_start: '2017-10-01'
          date_end: '2018-09-30'
          description: Temporary Position. Taught courses in Econometrics, Introduction to R, Statistics, and Macroeconometrics.

        - title: Research Fellow (PostDoc)
          company: SFB 823 at Technical University Dortmund
          company_url: https://www.statistik.tu-dortmund.de/sfb823.html
          company_logo: ''
          location: Dortmund, Germany
          date_start: '2015-11-01'
          date_end: '2017-06-30'
          description: Researched the transmission channels of macroeconomic shocks and economic policy with a focus on time-varying risk premia and rare disaster. Taught courses in Survey Sampling Methods and GMM, Indirect Inference, and Bootstrap.

        - title: Freelance
          company: Institut der Deutschen Wirtschaft
          company_url: https://www.iwkoeln.de/
          company_logo: ''
          location: Köln, Germany
          date_start: '2018-02-01'
          date_end: '2019-12-01'
          description: Taught courses in Introduction to R for Applied Economists.

        - title: PhD Traineeship
          company: European Central Bank
          company_url: https://www.ecb.europa.eu
          company_logo: ''
          location: Frankfurt, Germany
          date_start: '2015-05-01'
          date_end: '2015-07-31'
          description: Research stay at DG-E Fiscal Policies. Researched fiscal policy within the EAGLE model.

        - title: Research Associate (PhD Student)
          company: University of Muenster
          company_url: https://www.wiwi.uni-muenster.de/oeew/de
          company_logo: ''
          location: Münster, Germany
          date_start: '2012-06-01'
          date_end: '2015-10-31'
          description: PhD Thesis on *Local identification of nonlinear and non-Gaussian DSGE models*. Taught courses in DSGE Models, Empirical Methods, Macroeconometrics, Multivariate Time Series Analysis, Introduction to R, and GMM/Indirect Inference/Bootstrap.

  - block: portfolio
    id: projects
    content:
      title: Projects
      filters:
        folders:
          - project
    design:
      columns: '2'
      view: card
      flip_alt_rows: false

  - block: collection
    id: featured
    content:
      title: Research in Progress
      filters:
        folders:
          - publication
        featured_only: true
    design:
      columns: '2'
      view: citation

  - block: collection
    content:
      title: Journal Publications
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      columns: '2'
      view: citation
