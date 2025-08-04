/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container inside the section
  const container = element.querySelector(':scope > .container') || element;

  // Find the main grid that holds all top-level content
  const mainGrid = container.querySelector(':scope > .w-layout-grid.grid-layout');
  if (!mainGrid) return;

  const children = Array.from(mainGrid.children);

  // For this block, we want to group all content into a single left cell, as in the example
  // (heading, quote, reviewer info)
  const leftColItems = [];

  // Heading
  const heading = children.find(child => child.matches('p.h2-heading, h2'));
  if (heading) leftColItems.push(heading);

  // Quote
  const quote = children.find(child => child.matches('p.paragraph-lg'));
  if (quote) leftColItems.push(quote);

  // Reviewer info: look for a nested grid (w-layout-grid) among mainGrid children
  const reviewerBlock = children.find(child => 
    child.classList.contains('w-layout-grid') && child !== mainGrid
  );
  if (reviewerBlock) leftColItems.push(reviewerBlock);

  // Table: header then a single row with [all-content, empty]
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftColItems, ''];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
