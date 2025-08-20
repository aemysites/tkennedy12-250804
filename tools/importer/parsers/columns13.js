/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as in the example
  const headerRow = ['Columns (columns13)'];

  // Find all tabs panes that serve as columns blocks
  const tabPanes = Array.from(
    element.querySelectorAll('.tab-content > .tab-pane')
  );

  // Each tab-pane is a row for our block, with two columns: image, text
  const rows = tabPanes.map((pane) => {
    // Find both column containers within the pane
    const parsysColumns = pane.querySelectorAll(
      '.parsys_column.pwccol2-longformc-c0, .parsys_column.pwccol2-longformc-c1'
    );
    // Defensive: if not found, fallback to broader selector
    let col0 = parsysColumns[0] || pane;
    let col1 = parsysColumns[1] || pane;

    // Extract image element in first column (if any)
    let image = col0.querySelector('img');
    if (!image) {
      // Fallback: if no image, include entire column
      image = col0;
    }

    // Extract text block from second column
    let text = col1.querySelector('.text-component');
    if (!text) {
      // Fallback: if no text-component, include entire column
      text = col1;
    }

    return [image, text];
  });

  // Compose cells array: header row, then block rows
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
