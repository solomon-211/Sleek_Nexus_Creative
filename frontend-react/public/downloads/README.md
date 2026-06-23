# Free Resource Downloads

Place the downloadable PDF files for the **Free Resources** page in this folder.
The file names must match exactly what is referenced in
`src/pages/courses/FreeResources.jsx`:

| Resource                         | Expected file name                          |
| -------------------------------- | ------------------------------------------- |
| HTML & CSS Starter Kit           | `html-css-starter-kit.pdf`                  |
| JavaScript Fundamentals Cheatsheet | `javascript-fundamentals-cheatsheet.pdf`  |
| Mobile App Planning Template     | `mobile-app-planning-template.pdf`          |
| SQL Basics for Beginners         | `sql-basics-for-beginners.pdf`              |
| UI Design Principles Poster      | `ui-design-principles-poster.pdf`           |
| Cybersecurity Checklist for SMEs | `cybersecurity-checklist-smes.pdf`          |

Anything in `public/` is served at the site root, so a file saved as
`public/downloads/html-css-starter-kit.pdf` is reachable at
`/downloads/html-css-starter-kit.pdf` — which is exactly what the Download
button links to.

To add or rename a resource, update both the file here and its `file:` path in
`FreeResources.jsx`.
