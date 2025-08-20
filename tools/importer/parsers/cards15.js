/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the columns in the cards block
  const columnWrappers = element.querySelectorAll(':scope > div > div');
  const rows = [['Cards (cards15)']];

  columnWrappers.forEach((column) => {
    // The .textimage component is the card root
    const cardRoot = column.querySelector('.textimage');
    if (!cardRoot) return;

    // Extract image for the first cell
    let imageCell = null;
    const img = cardRoot.querySelector('.textimage-image img');
    if (img) {
      imageCell = img;
    } else {
      // fallback to the image container
      const imageDiv = cardRoot.querySelector('.textimage-image');
      if (imageDiv) imageCell = imageDiv;
    }

    // Extract the text content for the second cell
    let textCell = null;
    const textBlock = cardRoot.querySelector('.textimage-text .text-component');
    if (textBlock) {
      textCell = textBlock;
    } else {
      // fallback to all textimage-text
      const textDiv = cardRoot.querySelector('.textimage-text');
      if (textDiv) textCell = textDiv;
    }

    // Only add if there's content
    if (imageCell || textCell) {
      rows.push([imageCell, textCell]);
    }
  });

  // Only create and replace if there is at least one card
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
