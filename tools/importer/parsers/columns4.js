/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell with the block name
  const headerRow = ['Columns (columns4)'];

  // Gather all top-level column divs
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Second row: each column div in its own column cell
  const columnsRow = columnDivs;

  // Compose the table data: header as one cell row, columns as the second row
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
