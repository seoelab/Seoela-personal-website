# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: about.biography
    id: about
    content:
      title: About Me  # Changed title to be more engaging
      # Choose a user profile to display (a folder name within content/authors/)
      username: admin

  # Uncomment this section if you want to showcase teaching slides
  # - block: slides
  #   id: slides_teaching
  #   content:
  #     title: Teaching
  #     filters:
  #       folders:
  #         - slides

  - block: portfolio
    id: projects
    content:
      title: Featured Projects  # More appealing title
      filters:
        folders:
          - project
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: card
      flip_alt_rows: true  # Adding some variation with flipping alternate rows
      default_button_index: 0
      # Filter toolbar to allow viewers to filter your work
      buttons:
        - name: All Projects
          tag: '*'
        - name: Reports
          tag: Reports
        - name: Others
          tag: Others

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
      flip_alt_rows: true  # Adds variation to the layout

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
      flip_alt_rows: true  # Enhances visual appeal with alternating row layouts
