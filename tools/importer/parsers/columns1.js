/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the markdown example
  const headerRow = ['Columns (columns1)'];
  
  // Find the two columns (left and right) under .pwccol2-longform
  const columns = element.querySelectorAll('.pwccol2-longform > .parsys_column');
  
  // Defensive: Make sure there are 2 columns
  let leftCell = null;
  let rightCell = null;

  // LEFT column: Rich text and button block
  if (columns[0]) {
    // Use the inner .cmp-container if exists, else the entire column
    const leftCmp = columns[0].querySelector('.cmp-container');
    leftCell = leftCmp ? leftCmp : columns[0];
  } else {
    leftCell = document.createTextNode('');
  }

  // RIGHT column: Should contain the video asset
  if (columns[1]) {
    const rightCmp = columns[1].querySelector('.cmp-container');
    rightCell = rightCmp ? rightCmp : columns[1];
  } else {
    rightCell = document.createTextNode('');
  }

  // Compose cells as [header row, content row of 2 columns]
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
