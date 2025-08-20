/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion header row matches the block name exactly
  const headerRow = ['Accordion'];
  const rows = [headerRow];

  // Get all accordion items that are direct children (by class)
  const items = element.querySelectorAll('.cmp-accordion__item');

  items.forEach(item => {
    // Title cell: get the button's title span (referencing existing element)
    const button = item.querySelector('.cmp-accordion__header .cmp-accordion__button');
    let titleCell = '';
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      titleCell = titleSpan || button;
    }

    // Content cell: all content inside the panel (reference existing elements)
    let contentCell = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // The content is typically inside .text-component blocks, but there may be multiple such blocks
      const textComponents = panel.querySelectorAll('.text-component');
      if (textComponents.length > 0) {
        // Use all text-components (as references, not clones)
        contentCell = Array.from(textComponents);
      } else {
        // Fallback: use all <p>, <ul>, <ol> direct children under panel
        const fallbackBlocks = Array.from(panel.querySelectorAll(':scope > p, :scope > ul, :scope > ol'));
        if (fallbackBlocks.length > 0) {
          contentCell = fallbackBlocks;
        } else {
          // If still nothing, use the panel itself (will capture any hidden or edge content)
          contentCell = panel;
        }
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
