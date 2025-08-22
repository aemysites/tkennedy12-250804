export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Get the first div child of the block
  const firstDiv = block.children[0];
  // Get the 2nd div child of the block
  const secondDiv = block.children[1];

  // Now in the 2nd div, swap the p tag and the h1 tag
  const pTag = secondDiv.querySelector('div');
  const h1Tag = secondDiv.querySelector('h1');
  if (pTag && h1Tag) {
    secondDiv.insertBefore(h1Tag, pTag);
  }
  
  // Swap the two divs in the dom
  block.insertBefore(secondDiv, firstDiv);
}
