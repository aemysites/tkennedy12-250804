/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu with tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Get the tab content container and panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Prepare header row as in the example
  const headerRow = ['Tabs'];

  // Prepare rows for each tab
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab Label -- prefer .paragraph-lg, fallback to tabLink text
    let labelEl = tabLink.querySelector('.paragraph-lg');
    if (!labelEl) labelEl = tabLink;

    // Tab Content -- take the direct child grid (w-layout-grid) from the corresponding pane
    let tabContentCell = '';
    if (tabPanes[idx]) {
      const grid = tabPanes[idx].querySelector('.w-layout-grid');
      tabContentCell = grid ? grid : tabPanes[idx];
    }

    return [labelEl, tabContentCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
