---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: about.biography
    id: about
    content:
      #title: Biography
      # Choose a user profile to display (a folder name within content/authors/)
      username: admin
  #- block: resume-experience
  #  id: experience
  #  content:
  #    username: admin
  #  design:
  #    # Hugo date format
  #    date_format: 'January 2006'
  #    # Education or Experience section first?
  #    is_education_first: false
  - block: portfolio
    id: projects
    content:
      title: Policy Briefs
      filters:
        folders:
          - project
    design:
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '2'
      view: citation
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
      view: citation
      # For Showcase, card, view, flip alternate rows?
      flip_alt_rows: false
  - block: collection
    id: featured
    content:
      title: Working Papers
      filters:
        folders:
          - publication
        featured_only: true
    design:
      columns: '2'
      view: citation
  - block: collection
    content:
      title: Publications
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      columns: '2'
      view: citation 
---
