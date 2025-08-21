/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns in the structure
  const columnControl = element.querySelector('.columnControl');
  if (!columnControl) return;
  const columns = columnControl.querySelectorAll(':scope > .parsys_column');
  // If there aren't direct columns, try next level
  let col0, col1;
  if (columns.length === 0) {
    const innerColumns = columnControl.querySelectorAll(':scope > .parsys_column > .parsys_column');
    if (innerColumns.length >= 2) {
      col0 = innerColumns[0];
      col1 = innerColumns[1];
    } else {
      return;
    }
  } else if (columns.length >= 2) {
    col0 = columns[0];
    col1 = columns[1];
  } else {
    return;
  }

  // LEFT COLUMN: Collect all content
  const leftContent = [];
  // Each column may have multiple .cmp-container blocks, each may have text
  col0.querySelectorAll(':scope > .cmp-container').forEach(container => {
    container.querySelectorAll(':scope > .text .text-component').forEach(txt => {
      leftContent.push(txt);
    });
  });

  // RIGHT COLUMN: Image
  let rightContent = [];
  col1.querySelectorAll(':scope > .cmp-container').forEach(container => {
    // Accept any image inside .image .asset-sharing-component img
    const img = container.querySelector('img');
    if (img) rightContent.push(img);
  });

  // Prepare the columns2/3 table
  const headerRow = ['Columns (columns23)'];
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}