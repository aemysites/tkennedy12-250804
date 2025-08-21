/* global WebImporter */
export default function parse(element, { document }) {
  // --- Get the two top-level columns from the first columnControl ---
  const columnControl = element.querySelector('.columnControl');
  if (!columnControl) return;
  const pwccol2 = columnControl.querySelector('.pwccol2-longform');
  if (!pwccol2) return;
  const cols = pwccol2.querySelectorAll(':scope > .parsys_column');
  if (cols.length !== 2) return;

  // LEFT: text block (heading + intro text)
  let leftContent = null;
  const leftContainer = cols[0].querySelector(':scope > .cmp-container');
  if (leftContainer) leftContent = leftContainer;

  // RIGHT: video block
  let rightContent = null;
  const rightContainer = cols[1].querySelector(':scope > .cmp-container');
  if (rightContainer) rightContent = rightContainer;

  // --- Get the next .columnControl (for quote and author) ---
  let nextSibling = element.nextElementSibling;
  while (nextSibling && !nextSibling.classList.contains('columnControl')) {
    nextSibling = nextSibling.nextElementSibling;
  }
  let quoteCol0 = null;
  let quoteCol1 = null;
  if (nextSibling) {
    const colLongformc = nextSibling.querySelector('.pwccol2-longformc');
    if (colLongformc) {
      const quoteCols = colLongformc.querySelectorAll(':scope > .parsys_column');
      if (quoteCols.length === 2) {
        // LEFT: headshot and name
        const leftQuoteContainer = quoteCols[0].querySelector(':scope > .cmp-container');
        if (leftQuoteContainer) quoteCol0 = leftQuoteContainer;
        // RIGHT: quote
        const rightQuoteContainer = quoteCols[1].querySelector(':scope > .cmp-container');
        if (rightQuoteContainer) quoteCol1 = rightQuoteContainer;
      }
    }
  }

  // Build the table. The header row should be exactly 'Columns (columns25)'
  const headerRow = ['Columns (columns25)'];
  const mainRow = [leftContent, rightContent];
  const quoteRow = [quoteCol0, quoteCol1];
  const cells = [headerRow, mainRow, quoteRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
