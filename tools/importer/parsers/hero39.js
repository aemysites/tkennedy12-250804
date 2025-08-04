/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero39)'];

  // Get main grid containers
  const grids = element.querySelectorAll(':scope > .w-layout-grid > div');

  // Background image: try to find first <img> in first grid cell
  let bgImg = null;
  if (grids.length > 0) {
    bgImg = grids[0].querySelector('img');
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }

  // Gather hero text content: headline, subheading, CTA
  let textContent = [];
  if (grids.length > 1) {
    const contentRoot = grids[1];
    // h1 headline
    const h1 = contentRoot.querySelector('h1');
    if (h1) textContent.push(h1);
    // Subheading and button in .flex-vertical
    const flexV = contentRoot.querySelector('.flex-vertical');
    if (flexV) {
      const para = flexV.querySelector('p');
      if (para) textContent.push(para);
      const cta = flexV.querySelector('a.button');
      if (cta) textContent.push(cta);
    }
  }

  // Compose block table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : '']
  ];

  // Replace element with structured block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
