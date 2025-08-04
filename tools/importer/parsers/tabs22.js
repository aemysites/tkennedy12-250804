/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  if (!tabMenu) return;
  // Each tab label is in an <a> with a <div> containing the label text
  const tabLinks = Array.from(tabMenu.querySelectorAll('a'));
  // Get the tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabContent) return;
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));
  // Header row: must be a single column with 'Tabs'
  const headerRow = ['Tabs'];
  // Each subsequent row: [label, content]
  const cells = [headerRow];
  for (let i = 0; i < tabLinks.length; i++) {
    // Label: from tabLinks[i] <div>
    let labelText = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      labelText = labelDiv.textContent.trim();
    } else {
      labelText = tabLinks[i].textContent.trim();
    }
    // Content: reference the main grid child of w-tab-pane or fallback to the pane itself
    let contentElem = '';
    if (tabPanes[i]) {
      const grid = tabPanes[i].querySelector('.w-layout-grid');
      if (grid) {
        contentElem = grid;
      } else {
        contentElem = tabPanes[i];
      }
    }
    cells.push([labelText, contentElem]);
  }
  // The header row is a single cell, but subsequent rows have two cells as per the example
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
