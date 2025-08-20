/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the example
  const headerRow = ['Hero (hero17)'];

  // Find the background image: first <img> inside the block
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) {
    bgImg = img;
  }

  // Collect all headline and paragraph content (typically the main hero text)
  // Only direct children and their children under the hero block
  const textContent = [];
  // Get all paragraphs and headings in the block (in order)
  element.querySelectorAll('p, h1, h2, h3, h4, h5, h6').forEach(e => {
    if (e.textContent.trim()) {
      textContent.push(e);
    }
  });
  // If no text found, cell should be empty string
  const thirdRow = textContent.length ? [textContent] : [''];

  const cells = [
    headerRow,
    [bgImg || ''],
    thirdRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
