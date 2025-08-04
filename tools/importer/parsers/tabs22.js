/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu and tab content containers
  const directChildren = Array.from(element.children);
  let tabMenu = null;
  let tabContent = null;
  for (const child of directChildren) {
    if (child.classList.contains('w-tab-menu')) {
      tabMenu = child;
    } else if (child.classList.contains('w-tab-content')) {
      tabContent = child;
    }
  }
  if (!tabMenu || !tabContent) return;

  // Get all tab menu links (tab labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));
  // Get all tab panes (tab contents)
  const tabPanes = Array.from(tabContent.querySelectorAll('div[role="tabpanel"]'));

  // Build rows - header is a single cell row
  const cells = [];
  cells.push(['Tabs']);

  // For each tab, get label and content
  for (let i = 0; i < tabLinks.length; i++) {
    const tabLink = tabLinks[i];
    // Get the tab label from inner text of the button (prefer first div but fallback to a.textContent)
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Find tab pane by data-w-tab attribute
    const tabName = tabLink.getAttribute('data-w-tab');
    let pane = null;
    for (const p of tabPanes) {
      if (p.getAttribute('data-w-tab') === tabName) {
        pane = p;
        break;
      }
    }
    // If no pane found, skip
    if (!pane) continue;
    // Use the first .w-layout-grid child inside the pane as the tab content, fallback to pane
    const contentGrid = pane.querySelector('.w-layout-grid');
    const tabContentElement = contentGrid || pane;
    // Push two-column row: [label, contentElement]
    cells.push([label, tabContentElement]);
  }

  // Create the block table so that the first row is single cell, others are two cells
  // Patch: after building the table, merge the first header row to span two columns
  const table = WebImporter.DOMUtils.createTable(cells, document);
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1 && cells.length > 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
