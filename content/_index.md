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
  - block: portfolio
    id: projects
    content:
      title: Projects
      filters:
        folders:
          - project
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
        - name: Other
          tag: Other
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

    
  - block: collection
    id: featured
    content:
      title: Media Coverage
      filters:
        folders:
          - event
       # featured_only: true
    design:
      columns: '2'
      view: citation

    block: contact
    id: contact
    content:
      title: Contact
      subtitle:
      text: |-
        Follow the link below for the latest version of my CV
          {{icon: cv
          name: Resume
          link: uploads/resume.pdf}}
      # Contact (add or remove contact options as necessary)
      
      directions: Bloomington, Indiana 47405
      office_hours:
        - 'Monday 10:00 to 13:00'
        - 'Wednesday 09:00 to 10:00'
      contact_links:
        - icon: twitter
          icon_pack: fab
          name: DM Me
          link: 'https://twitter.com/Twitter'
        - icon: skype
          icon_pack: fab
          name: Skype Me
          link: 'skype:echo123?call'
        - icon: cv
          name: Resume
          link: uploads/resume.pdf
    design:
      columns: '2'
---
