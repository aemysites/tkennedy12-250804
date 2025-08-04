/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match the example exactly
  const headerRow = ['Hero (hero28)'];

  // 2. Get the background image (if any)
  let bgImg = '';
  // The image appears within a nested div structure in the first grid cell
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // The first grid cell appears to contain the image
    const gridCells = grid.querySelectorAll(':scope > div');
    if (gridCells.length > 0) {
      const img = gridCells[0].querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
  }

  // 3. Get the headline and other text content
  let textContent = [];
  // The second grid cell contains the title, etc.
  if (grid) {
    const gridCells = grid.querySelectorAll(':scope > div');
    if (gridCells.length > 1) {
      const textWrapper = gridCells[1];
      // Gather all direct children that are not empty, preserving order
      // For this block, an h1 and (optionally) other subheadings/CTAs
      const children = Array.from(textWrapper.querySelectorAll(':scope > *'));
      children.forEach(child => {
        // Only include if visible (not an empty .button-group)
        if (child.tagName === 'DIV' && child.classList.contains('button-group') && child.children.length === 0) {
          return;
        }
        textContent.push(child);
      });
    }
  }

  // Fallback: at least try to get a single heading if somehow empty
  if (textContent.length === 0) {
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textContent.push(heading);
  }

  // 4. Assemble the table rows as required by the spec: [header], [image], [content]
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent.length ? textContent : '']
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
