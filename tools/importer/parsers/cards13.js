/* global WebImporter */
export default function parse(element, { document }) {
  // Start with block header
  const cells = [['Cards (cards13)']];

  // Find the header/description block: try both menu-desktop and menu-mobile for safety
  let heading = null, description = null;
  // Try desktop first
  let block = element.querySelector('.menu-desktop');
  if (!block) block = element.querySelector('.menu-mobile');
  if (block) {
    heading = block.querySelector('.collection-v3-listing__heading');
    description = block.querySelector('.collection-v3-listing__description');
  }
  // Fallback: try global search if still not found (for flexibility)
  if (!heading) heading = element.querySelector('.collection-v3-listing__heading');
  if (!description) description = element.querySelector('.collection-v3-listing__description');

  // Only add the content row if there's actual text content
  const content = [];
  if (heading && heading.textContent.trim()) content.push(heading);
  if (description && description.textContent.trim()) content.push(description);
  if (content.length > 0) {
    cells.push([content]);
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
