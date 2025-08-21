/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero24)'];

  // 2. Background image row (detect background image from desktopPoster, poster, or style)
  let bgImgUrl = null;
  let bgImg = null;
  const video = element.querySelector('video');
  if (video && video.hasAttribute('desktopposter')) {
    bgImgUrl = video.getAttribute('desktopposter');
  }
  if (!bgImgUrl && video && video.hasAttribute('poster')) {
    const poster = video.getAttribute('poster');
    if (poster && poster !== '#' && poster !== '') {
      bgImgUrl = poster;
    }
  }
  if (!bgImgUrl) {
    const videoWrapper = element.querySelector('.herov2__video-wrapper');
    if (videoWrapper) {
      const style = videoWrapper.getAttribute('style') || '';
      const match = style.match(/--desktopPoster:\s*url\(([^)]+)\)/);
      if (match) {
        bgImgUrl = match[1].replace(/^['"]|['"]$/g, '');
      }
    }
  }
  if (bgImgUrl) {
    bgImg = document.createElement('img');
    bgImg.src = bgImgUrl;
    bgImg.alt = '';
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Gather all content in the hero text area (h1, subheading, CTA, etc)
  let contentCell = '';
  // Try to find the main content block with all hero text (content-wrapper)
  const contentWrapper = element.querySelector('.herov2__content-wrapper');
  if (contentWrapper) {
    // Collect all elements (not just h1) inside the content wrapper, preserving their order
    const allEls = Array.from(contentWrapper.children).filter(
      el => el.textContent.trim() !== ''
    );
    // If nothing in children, fallback to childNodes (to catch text nodes)
    if (allEls.length) {
      contentCell = allEls.length === 1 ? allEls[0] : allEls;
    } else {
      const childNodes = Array.from(contentWrapper.childNodes).filter(
        n => n.textContent && n.textContent.trim() !== ''
      );
      contentCell = childNodes.length === 1 ? childNodes[0] : childNodes;
    }
  } else {
    // Fallback: gather all headings and paragraphs in hero area
    const heroV2 = element.querySelector('.hero-v2, .herov2__wrapper');
    if (heroV2) {
      const textEls = Array.from(heroV2.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,button')).filter(
        el => el.textContent.trim() !== ''
      );
      contentCell = textEls.length === 1 ? textEls[0] : textEls;
    } else {
      // Last fallback: include any text from the element
      contentCell = element.textContent.trim();
    }
  }

  // 4. Assemble the table structure
  const cells = [
    headerRow,
    bgImgRow,
    [contentCell]
  ];

  // 5. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
