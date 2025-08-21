/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards18)'];

  // Get all card articles
  const cards = Array.from(element.querySelectorAll('article.collection__item'));
  const rows = [headerRow];

  cards.forEach((card) => {
    // IMAGE: Get the image node (first cell, must reference, not clone)
    let img = null;
    const imgWrapper = card.querySelector('.collection__item-image-wrapper');
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // TEXT: Compose all text content
    const content = card.querySelector('.collection__item-content');
    const parts = [];
    if (content) {
      // Date/subheading (keep as <time> if present)
      const subHeading = content.querySelector('.collection__item-sub-heading');
      if (subHeading) {
        // Reference the <p> node with <time> inside as is
        parts.push(subHeading);
      }
      // Title (strong, not h4, per example semantics)
      const heading = content.querySelector('.collection__item-heading');
      if (heading) {
        const strong = document.createElement('strong');
        if (heading.querySelector('span')) {
          strong.textContent = heading.querySelector('span').textContent;
        } else {
          strong.textContent = heading.textContent;
        }
        parts.push(strong);
      }
      // Description (paragraph)
      const desc = content.querySelector('p.paragraph');
      if (desc) {
        parts.push(desc);
      }
      // Call To Action: Only if the card is a link (per card), last in cell
      const cardLink = card.querySelector('a.collection__item-link');
      if (cardLink && cardLink.href) {
        const cta = document.createElement('p');
        const ctaLink = document.createElement('a');
        ctaLink.href = cardLink.href;
        ctaLink.textContent = 'Read more';
        cta.appendChild(ctaLink);
        parts.push(cta);
      }
    }
    // Compose row: [image, text content(s)]
    rows.push([img, parts]);
  });
  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
