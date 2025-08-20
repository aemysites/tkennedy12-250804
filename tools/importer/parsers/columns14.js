/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get column elements in a columnControl
  function getColumns(colCtrl) {
    // Column containers have classes .parsys_column
    return Array.from(colCtrl.querySelectorAll(':scope > .parsys_column'));
  }

  // Find all columnControl sections (each for a row of Columns block)
  const columnControls = element.querySelectorAll(':scope .columnControl');

  // Compose header row for Columns block
  const headerRow = ['Columns (columns14)'];
  const rows = [];

  columnControls.forEach((colCtrl) => {
    const columns = getColumns(colCtrl);
    // For each column, gather main cmp-container(s) content, or fallback to direct children
    const cells = columns.map((col) => {
      // Look for immediate .cmp-container children
      const cmpContainers = col.querySelectorAll(':scope > .cmp-container');
      if (cmpContainers.length) {
        // See if .cmp-container has a single main child; otherwise use .cmp-container
        return Array.from(cmpContainers).map((container) => {
          // Select all direct children that are not empty divs
          const mainKids = Array.from(container.children).filter(
            (el) => !(el.tagName === 'DIV' && el.innerHTML.trim() === '')
          );
          // If only one real child, return it, else return all
          if (mainKids.length === 1) return mainKids[0];
          if (mainKids.length > 1) return mainKids;
          // fallback
          return container;
        });
      } else {
        // fallback: use all direct children
        const contentKids = Array.from(col.children).filter(
          (el) => !(el.tagName === 'DIV' && el.innerHTML.trim() === '')
        );
        if (contentKids.length === 1) return contentKids[0];
        if (contentKids.length > 1) return contentKids;
        return col;
      }
    });
    // flatten single-item arrays for cleaner table cells
    const cellsFlat = cells.map((cell) => Array.isArray(cell) && cell.length === 1 ? cell[0] : cell);
    rows.push(cellsFlat);
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
