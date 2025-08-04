/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Table block name
  const headerRow = ['Hero (hero39)'];

  // 2nd row: background image (optional)
  // Find the prominent <img> - it's a direct child of the first grid-layout > div
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid.grid-layout > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img && img.src) {
      bgImg = img;
      break;
    }
  }
  const bgImgRow = [bgImg];

  // 3rd row: Headline, subheading, call-to-action
  let contentElements = [];
  if (gridDivs.length > 1) {
    // The second grid-layout > div contains the textual content
    const contentDiv = gridDivs[1];
    // The main text block is a .w-layout-grid inside contentDiv
    const textGrid = contentDiv.querySelector('.w-layout-grid');
    if (textGrid) {
      // Headline
      const headline = textGrid.querySelector('h1');
      if (headline) contentElements.push(headline);
      // Subheading and CTA are in a vertical flex below
      const verticalFlex = textGrid.querySelector('.flex-vertical');
      if (verticalFlex) {
        // Subheading paragraph
        const subheading = verticalFlex.querySelector('p');
        if (subheading) contentElements.push(subheading);
        // Call-to-action button(s)
        const buttonGroup = verticalFlex.querySelector('.button-group');
        if (buttonGroup) {
          contentElements.push(buttonGroup);
        }
      }
    }
  }
  const contentRow = [contentElements];

  // Compose the table rows as specified: 1 col, 3 rows
  const cells = [headerRow, bgImgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
