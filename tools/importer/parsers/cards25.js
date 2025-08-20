/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Helper: get text content container (h3, p, etc) without cloning, referencing originals
  function getTextContent(cardDiv) {
    // Prefer the .utility-padding-all-2rem wrapper if available
    let content = cardDiv.querySelector('.utility-padding-all-2rem');
    if (content) return content;
    // Fallback: look for h3 or p directly
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');
    if (h3 || p) {
      const wrapper = document.createElement('div');
      if (h3) wrapper.appendChild(h3);
      if (p) wrapper.appendChild(p);
      return wrapper.childNodes.length > 0 ? wrapper : '';
    }
    return '';
  }

  // Only direct children that have an <img>, and that are not pure image wrappers (must have at least one of h3, p)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  cardDivs.forEach((cardDiv) => {
    // Prefer first <img> as the image
    const img = cardDiv.querySelector('img');
    const textContent = getTextContent(cardDiv);
    rows.push([img, textContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
