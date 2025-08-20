/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get columns from a .columnControl element
  function getColumns(colControl) {
    return Array.from(colControl.querySelectorAll(':scope > .parsys_column'));
  }

  // Get all top-level columnControl blocks
  const colControls = element.querySelectorAll(':scope > .parsys.sectionpar > .columnControl');
  if (colControls.length < 2) return;

  // FIRST ROW: 2 columns (left: heading/text, right: image)
  const firstCols = getColumns(colControls[0]);
  let leftCell1 = '';
  let rightCell1 = '';
  if (firstCols[0]) {
    // Select the container holding the heading and paragraphs
    // Grab all children of .text-component (heading, paragraphs)
    const textComp = firstCols[0].querySelector('.text-component');
    if (textComp) {
      leftCell1 = textComp;
    }
  }
  if (firstCols[1]) {
    const img = firstCols[1].querySelector('img');
    if (img) {
      rightCell1 = img;
    }
  }

  // SECOND ROW: 2 columns (left: image+name, right: quote)
  const secondCols = getColumns(colControls[1]);
  let leftCell2 = '';
  let rightCell2 = '';
  if (secondCols[0]) {
    // Grab the textimage block
    const textimage = secondCols[0].querySelector('.textimage');
    if (textimage) {
      leftCell2 = textimage;
    }
  }
  if (secondCols[1]) {
    // Grab the quote block
    const quote = secondCols[1].querySelector('.quote');
    if (quote) {
      rightCell2 = quote;
    }
  }

  // Build the cells array
  const cells = [
    ['Columns (columns14)'],
    [leftCell1, rightCell1],
    [leftCell2, rightCell2]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
