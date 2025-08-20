/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const cells = [['Cards (cards20)']];

  // Collect all card blocks
  const children = Array.from(element.childNodes);
  let groups = [];
  let group = [];
  children.forEach((node) => {
    if (node.nodeType === 1 && node.matches('button.coe-article')) {
      if (group.length) groups.push(group);
      group = [node];
    } else if (group.length) {
      group.push(node);
    }
  });
  if (group.length) groups.push(group);

  groups.forEach((cardNodes) => {
    // Find components
    const button = cardNodes.find(n => n.nodeType === 1 && n.matches('button.coe-article'));
    const company = cardNodes.find(n => n.nodeType === 1 && n.matches('.coe-article-company'));
    const body = cardNodes.find(n => n.nodeType === 1 && n.matches('.coe-article-content-body'));
    const controls = cardNodes.find(n => n.nodeType === 1 && n.matches('.coe-article-controls'));
    const imageContainer = button.querySelector('.coe-article-image-container');
    const imageDiv = imageContainer ? imageContainer.querySelector('.coe-article-image') : null;
    let img = null;
    if (imageDiv && imageDiv.style && imageDiv.style.backgroundImage) {
      const urlMatch = imageDiv.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        img = document.createElement('img');
        img.src = urlMatch[1];
        img.alt = company ? company.textContent.trim() : '';
      }
    }
    // Subtitle/location
    let subtitle = null;
    if (imageContainer) {
      const sub = imageContainer.querySelector('.coe-article-location');
      if (sub && sub.textContent.trim()) {
        subtitle = document.createElement('div');
        subtitle.textContent = sub.textContent.trim();
        subtitle.style.fontWeight = 'normal';
        subtitle.style.marginBottom = '8px';
      }
    }
    // Build content side
    const contentArray = [];
    if (company) {
      const strong = document.createElement('strong');
      strong.textContent = company.textContent.trim();
      contentArray.push(strong);
    }
    if (subtitle) {
      contentArray.push(subtitle);
    }
    if (body) {
      Array.from(body.childNodes).forEach(node => {
        if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
          contentArray.push(node);
        }
      });
    }
    if (controls) {
      const link = controls.querySelector('a');
      if (link) contentArray.push(link);
    }
    cells.push([
      img || '',
      contentArray
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
