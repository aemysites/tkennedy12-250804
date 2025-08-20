/* global WebImporter */
export default function parse(element, { document }) {
  // Block header EXACTLY as in the example
  const headerRow = ['Hero (hero28)'];

  // Get the main grid layout children
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');

  // 1. BACKGROUND IMAGE ROW (second row, may be empty)
  let imgEl = null;
  if (gridDivs.length > 0) {
    // Look for img in the first grid column
    imgEl = gridDivs[0].querySelector('img');
  }
  // If not found, fallback to any img
  if (!imgEl) {
    imgEl = element.querySelector('img');
  }
  const imageRow = [imgEl ? imgEl : ''];

  // 2. CONTENT ROW (title, subheading, CTA, etc)
  let contentCellContent = [];
  if (gridDivs.length > 1) {
    // The right column typically has the container with actual content
    const contentDiv = gridDivs[1];
    // We want to preserve all direct children of .utility-margin-bottom-6rem
    const contentWrap = contentDiv.querySelector('.utility-margin-bottom-6rem');
    if (contentWrap) {
      // Use all direct children (h1, p, button-group, etc)
      Array.from(contentWrap.childNodes).forEach(node => {
        // Only include elements with meaningful content (no empty divs)
        if (
          (node.nodeType === 1 && (node.textContent.trim() || node.tagName.toLowerCase() === 'div' || node.tagName.toLowerCase() === 'h1' )) ||
          (node.nodeType === 3 && node.textContent.trim())
        ) {
          contentCellContent.push(node);
        }
      });
    } else {
      // Fallback: just take all child nodes of contentDiv
      Array.from(contentDiv.childNodes).forEach(node => {
        if (node.nodeType === 1 && node.textContent.trim()) {
          contentCellContent.push(node);
        }
      });
    }
  }
  // Fallback: if no content found above, search for headings, paragraphs, links in element
  if (contentCellContent.length === 0) {
    const fallbackEls = element.querySelectorAll('h1, h2, h3, h4, p, a, button');
    fallbackEls.forEach(el => {
      if (el.textContent.trim()) {
        contentCellContent.push(el);
      }
    });
  }
  const contentRow = [contentCellContent.length > 0 ? contentCellContent : ''];

  // Compose the block table as required: 1 col, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
