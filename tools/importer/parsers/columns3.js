/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column root container
  const columnsRoot = element.querySelector('.columnControl .pwccol2-longform');
  if (!columnsRoot) return;

  // Left column: .pwccol2-longform-c0
  const leftCol = columnsRoot.querySelector('.pwccol2-longform-c0');
  // Right column: .pwccol2-longform-c1
  const rightCol = columnsRoot.querySelector('.pwccol2-longform-c1');
  if (!leftCol || !rightCol) return;

  // Extract left column content: all direct children of leftCol's .cmp-container
  let leftContent = [];
  const leftContainer = leftCol.querySelector('.cmp-container');
  if (leftContainer) {
    // add all children of leftContainer except empty divs
    Array.from(leftContainer.children).forEach(child => {
      if (child.tagName === 'DIV' && child.innerHTML.trim() === '') return;
      leftContent.push(child);
    });
  } else {
    // fallback: use all leftCol children
    Array.from(leftCol.children).forEach(child => {
      if (child.tagName === 'DIV' && child.innerHTML.trim() === '') return;
      leftContent.push(child);
    });
  }
  // Edge: fallback to empty string if nothing found
  if (leftContent.length === 0) leftContent = [''];

  // Extract right column content: video player + description, both in .cmp-container
  let rightContent = [];
  const rightContainer = rightCol.querySelector('.cmp-container');
  if (rightContainer) {
    // Add all video player sections
    const videoWrappers = rightContainer.querySelectorAll('.videoplayerv3-wrapper');
    videoWrappers.forEach(vw => rightContent.push(vw));
    // Add any video description blocks
    const videoDescs = rightContainer.querySelectorAll('.videojs-description');
    videoDescs.forEach(desc => rightContent.push(desc));
  } else {
    // fallback: use all rightCol children
    Array.from(rightCol.children).forEach(child => {
      if (child.tagName === 'DIV' && child.innerHTML.trim() === '') return;
      rightContent.push(child);
    });
  }
  if (rightContent.length === 0) rightContent = [''];

  // Build cells array per block guidelines: header, then data row with two columns
  const cells = [
    ['Columns (columns3)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
