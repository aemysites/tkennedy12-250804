/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two columns in the source html
  // They are .pwccol2-longform-c0 (left), .pwccol2-longform-c1 (right)
  let leftCol = element.querySelector('.pwccol2-longform-c0');
  let rightCol = element.querySelector('.pwccol2-longform-c1');

  // Defensive: fallback if structure changes
  if (!leftCol || !rightCol) {
    const colDivs = Array.from(element.querySelectorAll(':scope > div'));
    leftCol = leftCol || colDivs[0];
    rightCol = rightCol || colDivs[1];
  }

  // For each column, grab all container content for resilience
  // Left column: get the .cmp-container inside, else the col itself
  let leftContent = leftCol ? leftCol.querySelector('.cmp-container') || leftCol : '';
  // Right column: get the .cmp-container inside, else the col itself
  let rightContent = rightCol ? rightCol.querySelector('.cmp-container') || rightCol : '';

  // Build the columns block table
  const cells = [
    ['Columns (columns5)'],
    [leftContent, rightContent]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
