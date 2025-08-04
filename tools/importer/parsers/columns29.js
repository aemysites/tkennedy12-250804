/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children which represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains an image
  const contentRow = columns.map(col => col.querySelector('img'));
  // The header row must be a single cell, spanning all columns
  // To achieve this, pass an array with one string as the first row
  const headerRow = ['Columns (columns29)'];
  const cells = [headerRow, contentRow];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set the colspan on the header cell to span all columns
  const th = table.querySelector('th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }
  element.replaceWith(table);
}
