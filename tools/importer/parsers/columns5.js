/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the two main columns
  function getColumns(container) {
    const colControl = container.querySelector('.columnControl');
    if (!colControl) return [];
    return Array.from(colControl.querySelectorAll(':scope > .parsys_column'));
  }

  const columns = getColumns(element);
  if (columns.length < 2) return;

  // Helper to get all top-level content blocks inside a column
  function getBlockElements(column) {
    // Top-level cmp-container blocks
    const blocks = Array.from(column.querySelectorAll(':scope > .cmp-container'));
    // Fallback: if empty, use the column as one block
    return blocks.length ? blocks : [column];
  }

  // Helper to extract the relevant left (text) content
  function extractLeftCell(block) {
    // Return .text-component if present, else all text children
    const textComp = block.querySelector('.text-component');
    return textComp ? textComp : block;
  }
  // Helper to extract the relevant right (visual) content
  function extractRightCell(block) {
    // Prefer <img>, fallback to video (converted to link), else block
    const img = block.querySelector('img');
    if (img) return img;
    const video = block.querySelector('video');
    if (video) {
      const src = video.querySelector('source');
      if (src && src.src) {
        const a = document.createElement('a');
        a.href = src.src;
        a.textContent = src.src;
        return a;
      }
    }
    return block;
  }

  // Get array of content blocks per column
  const leftBlocks = getBlockElements(columns[0]);
  const rightBlocks = getBlockElements(columns[1]);

  // The number of rows is the maximum number of blocks on either side
  const numRows = Math.max(leftBlocks.length, rightBlocks.length);
  const tableRows = [];
  for (let i = 0; i < numRows; i++) {
    const leftCell = leftBlocks[i] ? extractLeftCell(leftBlocks[i]) : '';
    const rightCell = rightBlocks[i] ? extractRightCell(rightBlocks[i]) : '';
    // Only add if at least one cell has actual content
    if ((typeof leftCell === 'string' ? leftCell.trim() : leftCell && (leftCell.textContent || leftCell.tagName === 'IMG' || leftCell.tagName === 'A')) ||
        (typeof rightCell === 'string' ? rightCell.trim() : rightCell && (rightCell.textContent || rightCell.tagName === 'IMG' || rightCell.tagName === 'A'))
    ) {
      tableRows.push([leftCell, rightCell]);
    }
  }

  // Compose table array: header row + each row of paired content
  const headerRow = ['Columns (columns5)'];
  const cells = [headerRow, ...tableRows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
