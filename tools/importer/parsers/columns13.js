/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as shown in the markdown example
  const headerRow = ['Columns (columns13)'];

  // All tab panels (each is a row in the block)
  const panes = Array.from(element.querySelectorAll('.tab-content > .tab-pane'));
  const rows = panes.map((pane) => {
    // Find two columns inside this tab panel
    let leftCol, rightCol;
    // The structure is: .columnControl > .parsys_column > .parsys_column
    const colBlocks = pane.querySelectorAll('.columnControl > .parsys_column > .parsys_column');
    if (colBlocks.length === 2) {
      leftCol = colBlocks[0];
      rightCol = colBlocks[1];
    } else {
      // fallback: try selecting by class suffixes
      leftCol = pane.querySelector('.pwccol2-longformc-c0');
      rightCol = pane.querySelector('.pwccol2-longformc-c1');
    }
    // For each column, use the inner content (the cmp-container if present)
    function getColumnContent(col) {
      if (!col) return document.createElement('div');
      // Prefer the cmp-container, else everything inside
      const cmp = col.querySelector(':scope > .cmp-container');
      return cmp || col;
    }
    const leftContent = getColumnContent(leftCol);
    const rightContent = getColumnContent(rightCol);
    return [leftContent, rightContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
