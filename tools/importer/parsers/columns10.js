/* global WebImporter */
export default function parse(element, { document }) {
  // The structure is: .parsys_column.pwccol2-longform > (c0 left, c1 right)
  // Each column has a .cmp-container
  const columns = element.querySelectorAll(':scope > .parsys_column');
  if (columns.length !== 2) return;

  // LEFT COLUMN (image)
  let leftCellContent;
  const leftCmp = columns[0].querySelector(':scope > .cmp-container');
  if (leftCmp) {
    // Use whole cmp-container so image and wrappers are preserved
    leftCellContent = leftCmp;
  } else {
    leftCellContent = columns[0];
  }

  // RIGHT COLUMN (list content)
  let rightCellContent;
  const rightCmp = columns[1].querySelector(':scope > .cmp-container');
  if (rightCmp) {
    // Prefer text-component inside cmp-container
    const textComp = rightCmp.querySelector('.text-component');
    if (textComp) {
      rightCellContent = textComp;
    } else {
      rightCellContent = rightCmp;
    }
  } else {
    rightCellContent = columns[1];
  }

  // Compose table structure
  const headerRow = ['Columns (columns10)'];
  const cells = [headerRow, [leftCellContent, rightCellContent]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
