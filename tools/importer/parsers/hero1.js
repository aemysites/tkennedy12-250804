/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero1)'];

  // Find image (background asset row)
  let imageEl = null;
  // image is inside: .herov2__image-wrapper > picture > img
  const imageWrapper = element.querySelector('.herov2__image-wrapper');
  if (imageWrapper) {
    const img = imageWrapper.querySelector('img');
    if (img) {
      imageEl = img;
    }
  }

  // Content row: subtitle, title (heading), CTA (if any)
  const contentWrapper = element.querySelector('.herov2__content-wrapper');
  const contentParts = [];
  if (contentWrapper) {
    // Subtitle (if present)
    const subtitle = contentWrapper.querySelector('.herov2__subtitle');
    if (subtitle) {
      contentParts.push(subtitle);
    }
    // Title (usually <h1>)
    const title = contentWrapper.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) {
      contentParts.push(title);
    }
    // CTA (if present)
    const cta = contentWrapper.querySelector('a, button');
    if (cta) {
      contentParts.push(cta);
    }
  }

  // Build rows as per structure: header, image, content
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentParts.length ? contentParts : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
