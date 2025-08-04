/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu and tab content container
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab menu links (will be in order)
  const tabLinks = Array.from(tabMenu.children).filter(el => el.matches('a,button,[role=tab]'));

  // Get all tab panes
  const tabPanes = Array.from(tabContent.children).filter(el => el.classList.contains('w-tab-pane'));

  // Table header: single column with only 'Tabs'
  // Each row: two columns [tab label, tab content]
  const rows = [];
  rows.push(['Tabs']);

  for (let i = 0; i < tabLinks.length; i++) {
    const link = tabLinks[i];
    let label = '';
    const innerDiv = link.querySelector('div');
    if (innerDiv) {
      label = innerDiv.textContent.trim();
    } else {
      label = link.textContent.trim();
    }

    let content = '';
    const pane = tabPanes[i];
    if (pane) {
      // Always reference the direct child content block inside each pane (usually a grid div)
      const mainContent = Array.from(pane.children).length === 1 ? pane.firstElementChild : pane;
      content = mainContent;
    }
    rows.push([label, content]);
  }

  // This forms a table with 1 column in header, and 2 columns for each row
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
