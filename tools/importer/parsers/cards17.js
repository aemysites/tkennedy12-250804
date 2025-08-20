/* global WebImporter */
export default function parse(element, { document }) {
  // Block header exactly as required
  const headerRow = ['Cards (cards17)'];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach((cardDiv) => {
    // First cell: image element (if present)
    const img = cardDiv.querySelector('img');
    // Second cell: try to find any content other than the image
    let textContent = '';
    // We look for text nodes or elements that are not the image
    cardDiv.childNodes.forEach((node) => {
      if (node !== img && node.nodeType === Node.ELEMENT_NODE) {
        textContent += node.outerHTML;
      } else if (node !== img && node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim();
      }
    });
    // If textContent is not empty, create a container element for it
    let textCell;
    if (textContent && textContent.length > 0) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = textContent;
      textCell = wrapper;
    } else {
      textCell = '';
    }
    rows.push([img, textCell]);
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
