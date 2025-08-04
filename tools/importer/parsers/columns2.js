/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with the 2 main columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The left main column: the first <a> child of grid
  const leftMain = grid.children[0];
  // The right has two vertical flex containers, each containing multiple <a> blocks with dividers
  const rightUpper = grid.children[1];
  const rightLower = grid.children[2];

  // Defensive: Ensure these exist
  if (!leftMain || !rightUpper || !rightLower) return;

  // Assemble the right column (stacked blocks)
  const rightColWrapper = document.createElement('div');
  rightColWrapper.append(rightUpper, rightLower);

  // Build the table according to the structure: 2 columns
  // Header row matches block name exactly
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns2)'],
    [leftMain, rightColWrapper]
  ], document);

  // Replace the section with the Columns block table
  element.replaceWith(table);
}
