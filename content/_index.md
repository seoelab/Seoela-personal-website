---
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
   # - block: slides
   # id: slides_teaching
   # content:
   #   title: Teaching
   #   filters:
   #     folders:
   #       - slides
  - block: portfolio
    id: projects
    content:
      title: Projects
      filters:
        folders:
          - project
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: card
      # Default filter index (e.g. 0 corresponds to the first filter_button instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (filter_button instances) as you like.
      # To show all items, set tag to "*".
      # To filter by a specific tag, set tag to an existing tag name.
      # To remove the toolbar, delete the entire filter_button block.
      buttons:
        - name: All
          tag: '*'
        - name: Reports
          tag: Reports
        - name: Others
          tag: Others
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: card
      # For Showcase, card, view, flip alternate rows?
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
  - block: shortcv
    id: experience
    content:
      title: Short CV
      items:
        - title: "Teaching Assistant"
          organization: "Dept. of Economics, Indiana University"
          dates: "Fall 2023, Spring 2024"
          responsibilities:
            - "Fundamentals of Economics I"
        - title: "Labor Economist"
          organization: "Idaho Department of Labor - Twin Falls, ID"
          dates: "Aug 2020 – Jul 2022"
          responsibilities:
            - "Conducted comprehensive research and analysis on labor market trends."
            - "Utilized econometric models to assess policy impacts."
            - "Collaborated on data collection efforts and generated detailed reports."
            - "Offered expert guidance on labor market policies."
        - title: "Data Science Intern"
          organization: "Albertsons Companies - Boise, ID"
          dates: "May 2019 – Nov 2019"
          responsibilities:
            - "Collaborated on data-driven projects, including predictive modeling and statistical analysis."
            - "Delivered actionable insights to enhance operational efficiency."
            - "Effectively communicated results to stakeholders."
        - title: "Graduate Research Assistant"
          organization: "Boise State University - Boise, ID"
          dates: "Aug 2018 – May 2020"
          responsibilities:
            - "Assisted faculty in economic research, including data collection and analysis."
            - "Conducted literature reviews and ensured the accuracy of research findings."
        - title: "Financial Analyst Intern"
          organization: "Second Wave Capital Management - Remote"
          dates: "Aug 2017 – Dec 2017"
          responsibilities:
            - "Assisted acquisition team with due diligence, financial analysis, and market research."
            - "Evaluated financial statements, performed valuation analyses, and conducted industry research."
            - "Prepared presentations for senior management."
---
