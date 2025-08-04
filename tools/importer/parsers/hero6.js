/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: Must exactly match example
  const headerRow = ['Hero (hero6)'];

  // Get grid columns (direct children of the top-level grid)
  const topGrid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let imgRow = [''];
  let contentRow = [''];

  if (topGrid) {
    const gridDivs = topGrid.querySelectorAll(':scope > div');
    // ---- Row 2: Background Image (if exists) ----
    if (gridDivs.length > 0) {
      const bgImg = gridDivs[0].querySelector('img');
      imgRow = [bgImg ? bgImg : ''];
    }
    // ---- Row 3: Content (heading, subheading, CTAs) ----
    if (gridDivs.length > 1) {
      // Content grid may be nested further, so descend until we reach the card
      let contentContainer = gridDivs[1];
      // Drill into any .grid-layout wrappers
      while (
        contentContainer &&
        contentContainer.children.length === 1 &&
        contentContainer.firstElementChild.classList.contains('w-layout-grid')
      ) {
        contentContainer = contentContainer.firstElementChild;
      }
      // Now, look for the .card
      const card = contentContainer.querySelector('.card');
      if (card) {
        const parts = [];
        // Heading
        const heading = card.querySelector('h1, h2, h3');
        if (heading) parts.push(heading);
        // Subheading (p.subheading or first <p> if exists)
        let subheading = card.querySelector('.subheading');
        if (!subheading) subheading = card.querySelector('p');
        if (subheading) parts.push(subheading);
        // Button group (CTA links)
        const btnGroup = card.querySelector('.button-group');
        if (btnGroup) parts.push(btnGroup);
        contentRow = [parts.length > 0 ? parts : ''];
      }
    }
  }

  // Assemble table with exactly 1 column and 3 rows
  const rows = [headerRow, imgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
