/* global WebImporter */
export default function parse(element, { document }) {
  // Find all contactCol blocks (cards)
  const contactCols = Array.from(element.querySelectorAll('.contactCol'));
  const rows = [['Cards (cards7)']]; // Header row

  contactCols.forEach((col) => {
    // 1st cell: Image (or empty string if missing)
    const img = col.querySelector('img.contact_image') || '';

    // 2nd cell: All text/info/links as a single content block
    // Reference the .contact-content block if available, else gather all except img
    let textBlock = col.querySelector('.contact-content');
    if (!textBlock) {
      // Fallback: gather all children except image
      const arr = [];
      Array.from(col.children).forEach(child => {
        if (!child.matches('img.contact_image')) arr.push(child);
      });
      textBlock = arr.length === 1 ? arr[0] : arr;
    }

    rows.push([
      img,
      textBlock
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
