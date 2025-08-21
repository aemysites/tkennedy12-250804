/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the example
  const headerRow = ['Hero (hero8)'];

  // Background row: no image in provided HTML, so empty string
  const backgroundRow = [''];

  // Content row: gather all content (headline, subheading, CTA)
  const content = element.querySelector('.syc-banner--content');
  let cellContent = [];

  // Gather the main banner text as a heading (styled as h1)
  const textDiv = content && content.querySelector('.syc-banner--text');
  if (textDiv) {
    // Build a heading out of the text nodes, preserving <em>
    const heading = document.createElement('h1');
    // Collect all child nodes (including span, em, etc) for correct order
    textDiv.childNodes.forEach((node) => {
      heading.appendChild(node.cloneNode(true));
    });
    cellContent.push(heading);
  }

  // Gather CTA button, if exists
  const cta = content && content.querySelector('.syc-banner--btn');
  if (cta) {
    // Use the existing anchor element (referenced, not cloned)
    cellContent.push(cta);
  }

  // If there is no content, leave the cell empty (edge case)
  const contentRow = [cellContent.length ? cellContent : ['']];

  // Build the table
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
