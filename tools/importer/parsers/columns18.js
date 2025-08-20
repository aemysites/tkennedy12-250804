/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches the example exactly
  const headerRow = ['Columns (columns18)'];

  // 2. Find all immediate columns (should be two for this block)
  const columns = element.querySelectorAll(':scope > .parsys_column');
  if (columns.length < 2) return; // Edge case: bail if not a two-column block

  // 3. LEFT COLUMN: Image (reference the existing img element)
  let leftCellContent = [];
  const leftImg = columns[0].querySelector('img');
  if (leftImg) leftCellContent.push(leftImg);

  // 4. RIGHT COLUMN: Text content, preserve headings, paragraphs, link
  let rightCellContent = [];
  const textComp = columns[1].querySelector('.text-component');
  if (textComp) {
    // Reference <h3> if present
    const h3 = textComp.querySelector('h3');
    if (h3) rightCellContent.push(h3);
    // Reference all <p> (including one with the link)
    const ps = textComp.querySelectorAll('p');
    ps.forEach(p => rightCellContent.push(p));
  }

  // 5. If any column is empty, still render the cell as empty (should not error)
  // 6. The semantic meaning of the source HTML is preserved (heading, paragraphs, button)
  // 7. Reference existing elements (not clones, not innerHTML)
  // 8. Table header is correct and no extra tables/hr/metadata blocks
  const cells = [headerRow, [leftCellContent, rightCellContent]];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
