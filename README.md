# Numaan Baig — Enterprise AI portfolio

A static, single-page portfolio for enterprise AI engineering opportunities and select freelance work. Intended for GitHub Pages at https://shoaibnumaan.github.io/.

## Local preview

No dependencies or build step are required:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Stop the server with Ctrl C.

## Files

- `index.html`: content, experience, seven projects, contact links and metadata.
- `css/styles.css`: base layout and responsive styles.
- `css/interactive.css`: interactive design and component styles.
- `css/themes.css`: light/dark palettes and Safari scrolling compatibility.
- `js/scripts.js`: theme toggle, mobile menu, project filters, capability explorer, email copying and navigation.
- `images/monogram.svg`: favicon.
- `images/social-preview.png`: social sharing image; `images/social-preview.svg` is its editable source.

Light is the default. The theme toggle saves an explicit selection in local storage. Essential content and navigation work without JavaScript, and animations respect reduced-motion preferences. Safari uses native scrolling and an opaque sticky header; the owner confirmed this resolves the scrolling issue.

## Resume and contact

Both resume links use https://bit.ly/resumeJan2023, which redirects to the owner's Drive PDF. Update that file in Drive; no resume files are hosted in this repository.

Contact links open email with separate role/project subjects. The email copy button appears when the Clipboard API is available in a secure context. There is no contact backend.

## Content and publishing

Project summaries reflect the supplied resumes and owner corrections. Financial Insights Assistant consolidates the duplicate financial platform entries, and GenAI DevOps Suite replaces its internal project name. Diagrams are conceptual illustrations. No numerical outcomes or current certification validity have been inferred.

Publish by committing and pushing to the branch configured for GitHub Pages. Verify that branch in the repository's Pages settings. This cleanup does not change hosting settings or publish the site.
