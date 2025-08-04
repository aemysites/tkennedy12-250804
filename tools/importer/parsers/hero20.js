/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero20)'];

  // 2nd row: Background Images (all <img> under hero background grid)
  // Locate the grid containing all images
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Place all images in a <div> for layout preservation
  let bgCell;
  if (images.length) {
    const bgDiv = document.createElement('div');
    images.forEach(img => bgDiv.appendChild(img));
    bgCell = bgDiv;
  } else {
    bgCell = '';
  }

  // 3rd row: Content (heading, subheading, CTAs)
  // Find the container with text content
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell = '';
  if (contentContainer) {
    // Reference all existing structural children (h1, p, buttons), preserving order
    const nodes = Array.from(contentContainer.childNodes).filter(node => {
      // Only include element nodes (skip whitespace text nodes)
      return node.nodeType === Node.ELEMENT_NODE;
    });
    if (nodes.length === 1) {
      // Single container child (unlikely but possible)
      contentCell = nodes[0];
    } else if (nodes.length > 1) {
      // Wrap all relevant children in a <div> for combined content
      const contentDiv = document.createElement('div');
      nodes.forEach(child => contentDiv.appendChild(child));
      contentCell = contentDiv;
    }
  }

  const cells = [
    headerRow,
    [bgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
