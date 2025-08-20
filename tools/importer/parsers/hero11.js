/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches example
  const headerRow = ['Hero (hero11)'];

  // Row 2: Background visual asset (img or video poster)
  // Prefer referencing the asset wrapper so we capture possible images/video
  let bgCell = '';
  const assetWrapper = element.querySelector('.herov2__asset-wrapper');
  if (assetWrapper) {
    bgCell = assetWrapper;
  }

  // Row 3: Text content (title, subtitle, supporting text, CTA)
  // Reference all text-containing elements from the content wrapper
  let contentCell = '';
  const contentWrapper = element.querySelector('.herov2__content-wrapper');
  if (contentWrapper) {
    // Gather all direct children that are likely to be text or cta elements
    const mainEls = [];
    // Prefer all block-level elements inside (h1, h2, h3, p, a, button)
    const candidates = contentWrapper.querySelectorAll('h1, h2, h3, p, a, button');
    candidates.forEach(el => mainEls.push(el));
    // If none found, use the whole contentWrapper
    contentCell = mainEls.length ? mainEls : [contentWrapper];
  }

  // Compose cells array for the block table
  const cells = [
    headerRow,
    [bgCell],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
