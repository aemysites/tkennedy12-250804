/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly matching the example
  const headerRow = ['Cards (cards10)'];
  const cells = [headerRow];
  // The cards are direct children <a> of the block element
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach((card) => {
    // Image is the first child div (may contain an img)
    let imageCell = null;
    const imageDiv = card.children[0];
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        imageCell = img;
      } else {
        imageCell = document.createElement('div');
      }
    } else {
      imageCell = document.createElement('div');
    }
    // Text is in the second child div
    const textDiv = card.children[1];
    // Compose text cell retaining semantic structure
    const textCell = document.createElement('div');
    // Tag (optional)
    if (textDiv) {
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        const tag = tagGroup.querySelector('.tag');
        if (tag) {
          // Wrap tag in a div for separation, and reference the original element
          const tagWrap = document.createElement('div');
          tagWrap.appendChild(tag);
          textCell.appendChild(tagWrap);
        }
      }
      // Heading (optional)
      const heading = textDiv.querySelector('h3');
      if (heading) {
        textCell.appendChild(heading);
      }
      // Description (optional)
      const description = textDiv.querySelector('p');
      if (description) {
        textCell.appendChild(description);
      }
    }
    cells.push([imageCell, textCell]);
  });
  // Create and replace with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
