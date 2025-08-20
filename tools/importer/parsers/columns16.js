/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all .columnControl blocks, top-level or nested
  let colControls = Array.from(element.querySelectorAll(':scope > .columnControl'));
  if (colControls.length === 0) {
    // fallback: nested anywhere in the block
    colControls = Array.from(element.querySelectorAll('.columnControl'));
  }
  if (!colControls.length) {
    // fallback: treat element as single column row
    colControls = [element];
  }

  // For each .columnControl, extract its columns (parsys_column children)
  const cells = [['Columns (columns16)']];
  colControls.forEach(colControl => {
    // Each column row
    const colDivs = Array.from(colControl.querySelectorAll(':scope > .parsys_column'));
    if (colDivs.length) {
      const rowCells = colDivs.map(col => {
        // Gather all direct child elements with actual content
        const children = Array.from(col.children).filter(child => {
          // Remove clear divs
          if (child.tagName === 'DIV' && child.getAttribute('style') && child.getAttribute('style').toLowerCase().includes('clear')) return false;
          // Remove empty wrappers
          if (!child.textContent.trim() && !child.querySelector('img, video, blockquote')) return false;
          return true;
        });
        // If more than one, combine into wrapper for full content
        if (children.length > 1) {
          const wrapper = document.createElement('div');
          children.forEach(child => wrapper.appendChild(child));
          return wrapper;
        }
        if (children.length === 1) return children[0];
        // If none, fallback to full column
        return col;
      });
      cells.push(rowCells);
    }
  });

  // Only replace if we have at least two rows (header and one content)
  if (cells.length > 1) {
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
