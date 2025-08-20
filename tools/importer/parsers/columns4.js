/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: matches example
  const headerRow = ['Columns (columns4)'];

  // Utility function: get direct columns from a columnControl
  function getColumns(container, columnClass) {
    // Query all direct .parsys_column children
    const columns = [];
    const colParents = container.querySelectorAll(`:scope > .parsys_column${columnClass ? '.'+columnClass : ''}`);
    colParents.forEach(colParent => {
      // We want the direct .cmp-container child
      const cmpContainer = colParent.querySelector(':scope > .cmp-container');
      if (cmpContainer) {
        columns.push(cmpContainer);
      }
    });
    return columns;
  }

  // Get the FIRST major section: alliances intro
  const section1 = element.querySelector('section.cmp-container');
  let row1 = [];
  if (section1) {
    const cc = section1.querySelector('.columnControl');
    if (cc) {
      // Get two columns (text, video)
      const columns = getColumns(cc, 'pwccol2-longform');
      if (columns.length === 2) {
        row1 = [columns[0], columns[1]];
      } else {
        // fallback: try .parsys_column direct children
        const fallbackCols = cc.querySelectorAll(':scope > .parsys_column');
        if (fallbackCols.length === 2) {
          row1 = [fallbackCols[0], fallbackCols[1]];
        }
      }
    }
  }

  // Get the SECOND section: profile and quote
  // Next .columnControl sibling (outside section)
  let row2 = [];
  // Find only the direct .columnControl in the top-level div (not inside previous section)
  const topColumnControl = Array.from(element.children).find(
    child => child.classList && child.classList.contains('columnControl')
  );
  if (topColumnControl) {
    // Get two columns (profile, quote)
    const columns = getColumns(topColumnControl, 'pwccol2-longformc');
    if (columns.length === 2) {
      row2 = [columns[0], columns[1]];
    } else {
      // fallback: try .parsys_column direct children
      const fallbackCols = topColumnControl.querySelectorAll(':scope > .parsys_column');
      if (fallbackCols.length === 2) {
        row2 = [fallbackCols[0], fallbackCols[1]];
      }
    }
  }

  // Build table rows
  const rows = [headerRow];
  if (row1.length === 2) {
    rows.push(row1);
  }
  if (row2.length === 2) {
    rows.push(row2);
  }

  // If we have no rows beyond header, do not replace
  if (rows.length === 1) return;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
