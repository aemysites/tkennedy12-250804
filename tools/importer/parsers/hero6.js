/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as in the example
  const headerRow = ['Hero (hero6)'];

  // 2. Second row: background image (img with class 'cover-image')
  let bgCell = '';
  const bgImg = element.querySelector('img.cover-image');
  if (bgImg) {
    bgCell = bgImg;
  }

  // 3. Third row: content (heading, subheading, ctas)
  let contentCell = '';
  // Card with text and ctas
  const card = element.querySelector('.card');
  if (card) {
    const content = [];
    // Heading (h1, h2, etc - prefer h1 if present)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) content.push(heading);
    // Subheading - prefer .subheading, fallback to p if needed
    let subheading = card.querySelector('.subheading');
    if (!subheading) subheading = card.querySelector('p');
    if (subheading) content.push(subheading);
    // CTAs: button group (all links/buttons inside .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only reference the already present group (no need to create new wrappers)
      content.push(buttonGroup);
    }
    if (content.length > 0) {
      contentCell = content;
    }
  }

  // Compose the block table structure: header, img, content
  const cells = [
    headerRow,
    [bgCell],
    [contentCell],
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
