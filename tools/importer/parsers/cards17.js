/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards17)'];
  // Each card is a .utility-aspect-1x1 containing an <img> and possibly text content after it
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Gather all non-image child nodes as text content (if present)
    const textContentNodes = Array.from(cardDiv.childNodes).filter(
      (node) => node !== img && (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()))
    );
    let textCell = '';
    if (textContentNodes.length) {
      // If there are element/text nodes present other than the img, put them in the text cell
      textCell = textContentNodes;
    }
    return [img, textCell];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
