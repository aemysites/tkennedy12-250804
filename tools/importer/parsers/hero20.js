/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Collect all the background images as in the first visual row
  // The images are in: .ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column > div > img
  let bgGrid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column');
  let bgContainer = document.createElement('div');
  if (bgGrid) {
    // Reference (not clone) all img.cover-image inside the grid
    Array.from(bgGrid.querySelectorAll('img.cover-image')).forEach(img => {
      bgContainer.appendChild(img);
    });
  }

  // 3. Get block content: headline, subheading, CTAs
  let contentCellElements = [];
  // The text and CTAs are in: .ix-hero-scale-3x-to-1x-content .container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Headline (h1)
    let h1 = contentContainer.querySelector('h1');
    if (h1) contentCellElements.push(h1);
    // Subheading (first p)
    let p = contentContainer.querySelector('p');
    if (p) contentCellElements.push(p);
    // CTAs - all a.button inside .button-group
    let buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      let ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length > 0) {
        // Put all CTA buttons into a single line-wrapped container
        let ctaDiv = document.createElement('div');
        ctas.forEach(a => ctaDiv.appendChild(a));
        contentCellElements.push(ctaDiv);
      }
    }
  }
  // If no content was found, add an empty string to preserve cell
  if (contentCellElements.length === 0) contentCellElements.push('');

  // 4. Compose table: 1 column, 3 rows
  const cells = [
    headerRow,                // row 1: header
    [bgContainer],            // row 2: background image(s)
    [contentCellElements]     // row 3: headline, subheading, CTAs
  ];

  // 5. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
