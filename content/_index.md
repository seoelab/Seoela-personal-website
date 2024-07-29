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
      # Choose a user profile to display (a folder name within `content/authors/`)
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
      # Default filter index (e.g. 0 corresponds to the first `filter_button` instance below).
      default_button_index: 0
      # Filter toolbar (optional).
      # Add or remove as many filters (`filter_button` instances) as you like.
      # To show all items, set `tag` to "*".
      # To filter by a specific tag, set `tag` to an existing tag name.
      # To remove the toolbar, delete the entire `filter_button` block.
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
---
