/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block
  const headerRow = ['Cards (cards12)'];

  // Find the filter buttons representing each card
  const filterContainer = element.querySelector('.ceo-filter-container');
  if (!filterContainer) return;
  const filterBlock = filterContainer.querySelector('.coe-filter');
  if (!filterBlock) return;
  const buttons = Array.from(filterBlock.querySelectorAll('.filter-button-item'));

  // Build card rows: always two columns (first: icon/image, second: text)
  const rows = buttons.map(btn => {
    // First cell: no image/icon provided, so leave blank
    // Second cell: use the button itself, preserving styling; wrap label in <strong> for semantic heading
    const textEl = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = btn.textContent.trim();
    textEl.appendChild(strong);
    return ['', textEl];
  });

  // Build final table data array
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
