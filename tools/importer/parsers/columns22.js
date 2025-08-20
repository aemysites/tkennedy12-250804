/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the first child matching selector within parent
  function find(parent, selector) {
    return parent ? parent.querySelector(selector) : null;
  }

  // --- Extract columns for first block (headline + text + video) ---
  let firstColumns = null;
  let leftCol = null, rightCol = null;

  // Find the columnControl containing .pwccol2-longform
  firstColumns = find(element, '.pwccol2-longform');
  if (firstColumns) {
    const cols = firstColumns.querySelectorAll(':scope > .parsys_column');
    if (cols.length === 2) {
      // Left: text
      leftCol = find(cols[0], '.cmp-container') || cols[0];
      // Right: video block
      rightCol = find(cols[1], '.cmp-container') || cols[1];
      // For rightCol, prefer the first videoplayer-v3 or videoplayerv3-wrapper
      const videoBlock = find(rightCol, '.videoplayer-v3') || find(rightCol, '.videoplayerv3-wrapper') || rightCol;
      rightCol = videoBlock;
    }
  }

  // --- Extract columns for second block (profile + quote) ---
  let secondColumns = null;
  let profileCol = null, quoteCol = null;

  secondColumns = find(element, '.pwccol2-longformc');
  if (secondColumns) {
    const cols = secondColumns.querySelectorAll(':scope > .parsys_column');
    if (cols.length === 2) {
      // Left: profile block
      profileCol = find(cols[0], '.cmp-container') || cols[0];
      // For profileCol, prefer textimage
      const textImageBlock = find(profileCol, '.textimage') || profileCol;
      profileCol = textImageBlock;
      // Right: quote block
      quoteCol = find(cols[1], '.cmp-container') || cols[1];
      const quoteBlock = find(quoteCol, '.quote') || quoteCol;
      quoteCol = quoteBlock;
    }
  }

  // Build table rows for columns block
  const headerRow = ['Columns (columns22)'];
  const rows = [headerRow];

  // First row: headline/text, video
  if (leftCol && rightCol) {
    rows.push([leftCol, rightCol]);
  }

  // Second row: profile, quote
  if (profileCol && quoteCol) {
    rows.push([profileCol, quoteCol]);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
