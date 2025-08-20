/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the requirement
  const headerRow = ['Hero (hero2)'];

  // 2nd row: Background Image (optional)
  // Find the image element (referenced from document, not cloned)
  let bgImgEl = null;
  const imgEl = element.querySelector('img');
  if (imgEl) bgImgEl = imgEl;
  const row2 = [bgImgEl ? bgImgEl : ''];

  // 3rd row: Title/Subheading/Paragraph/CTA (all text content except the image itself)
  // Collect all heading and paragraph elements (keep order as in HTML)
  // Only exclude p's that contain the image itself
  const contentEls = [];
  // Try to locate text container - .image div or element itself
  const textContainer = element.querySelector('.image') || element;
  textContainer.childNodes.forEach(node => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      // If element is a heading or paragraph (and not just an image)
      if (/^H[1-6]$/i.test(node.tagName)) {
        contentEls.push(node);
      } else if (node.tagName === 'P' && !node.querySelector('img')) {
        contentEls.push(node);
      }
    } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      // If direct text node (e.g., text directly in div)
      const p = document.createElement('p');
      p.textContent = node.textContent.trim();
      contentEls.push(p);
    }
  });
  const row3 = [contentEls.length ? contentEls : ''];

  // Compose the final table structure
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
