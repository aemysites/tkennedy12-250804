/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards container (list of articles)
  let cardsContainer = element.querySelector('.listing_collection_card_container, .listing-collection__result-search--disabled');
  if (!cardsContainer) {
    // fallback: look for a row with articles
    cardsContainer = element.querySelector('.row');
  }
  if (!cardsContainer) return;

  // Get all card articles
  const articles = Array.from(cardsContainer.querySelectorAll('article'));

  // Table rows: Header row only block name
  const rows = [['Cards (cards15)']];

  articles.forEach(article => {
    // Find main anchor (the whole card is a link)
    const link = article.querySelector('a');

    // Find image for the card (direct reference)
    let img = null;
    if (link) {
      const imgContainer = link.querySelector('.listing_collection_card_image_container');
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      }
    }

    // Text cell: use a DocumentFragment to preserve element structure but reference originals
    const textEls = [];

    // Date/time chips (optional)
    const chips = link ? link.querySelector('.listing_collection_card_title_chips') : null;
    if (chips && chips.textContent.trim()) textEls.push(chips);

    // Title (h4, prefer inside .listing_collection_card_title)
    let h4 = null;
    if (link) {
      const titleContainer = link.querySelector('.listing_collection_card_title');
      if (titleContainer) {
        h4 = titleContainer.querySelector('h4');
      }
    }
    if (h4 && h4.textContent.trim()) textEls.push(h4);

    // Description (optional)
    let desc = null;
    if (link) {
      desc = link.querySelector('.listing_collection_card_description');
    }
    if (desc && desc.textContent.trim()) textEls.push(desc);

    // CTA: Always provide a link to the card (per block description and markdown example)
    if (link && link.href) {
      // Only add CTA if not redundant (h4 text as link text)
      const cta = document.createElement('p');
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = h4 ? h4.textContent.trim() : link.href;
      cta.appendChild(a);
      textEls.push(cta);
    }

    // Compose row: [image, text cell]
    rows.push([
      img ? img : '',
      textEls.length === 1 ? textEls[0] : textEls
    ]);
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
