/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // LEFT COLUMN: heading, subheading, button group
  const left = cols[0];
  const leftContent = [];
  // Heading (h1)
  const heading = left.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading (p)
  const subheading = left.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group (all links in .button-group)
  const buttonGroup = left.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: images inside nested grid
  const right = cols[1];
  let rightContent = [];
  const imgGrid = right.querySelector('.grid-layout');
  if (imgGrid) {
    rightContent = Array.from(imgGrid.querySelectorAll('img'));
  }

  // Build table: header, then single row with two columns
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
