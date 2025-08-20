/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: Must match example exactly
  const headerRow = ['Hero (hero9)'];

  // --- Row 2: Background image/asset ---
  let bgImgElem = null;
  let bgImgUrl = null;
  // Try to get background image via CSS variable on video wrapper
  const videoWrapper = element.querySelector('.herov2__video-wrapper');
  if (videoWrapper) {
    const desktopPoster = videoWrapper.style.getPropertyValue('--desktopPoster');
    if (desktopPoster) {
      bgImgUrl = desktopPoster.trim().replace(/^url\(["']?/, '').replace(/["']?\)$/,'');
    }
  }
  // Fallback to <video desktopposter> or poster
  if (!bgImgUrl) {
    const video = element.querySelector('video');
    if (video) {
      bgImgUrl = video.getAttribute('desktopposter') || video.getAttribute('poster');
    }
  }
  // Fallback to section style background-image
  const section = element.querySelector('section') || element.closest('section');
  if (!bgImgUrl && section && section.style && section.style.backgroundImage) {
    const bgMatch = section.style.backgroundImage.match(/url\(['"]?(.*?)['"]?\)/);
    if (bgMatch && bgMatch[1]) {
      bgImgUrl = bgMatch[1];
    }
  }
  // Only create <img> if found and valid
  if (bgImgUrl && bgImgUrl !== '#' && bgImgUrl !== '') {
    bgImgElem = document.createElement('img');
    bgImgElem.src = bgImgUrl;
    bgImgElem.alt = '';
  }

  // --- Row 3: All hero text content, preserve headings/structure ---
  // Get the main wrapper for hero content
  let contentWrapper = element.querySelector('.herov2__content-wrapper');
  let contentElems = [];
  if (contentWrapper) {
    // Gather ALL child elements (not just h1), preserving document references
    // Use :scope > * to get direct children for robustness
    contentElems = Array.from(contentWrapper.children);
    // If nothing direct, gather all text nodes and headings inside
    if (contentElems.length === 0) {
      contentElems = Array.from(contentWrapper.querySelectorAll('h1,h2,h3,h4,p,span'));
    }
  } else {
    // Fallback: gather all h1,h2,h3,h4,p,span from the block
    contentElems = Array.from(element.querySelectorAll('h1,h2,h3,h4,p,span'));
  }
  
  // Filter out empty elements
  contentElems = contentElems.filter(el => {
    if (!el) return false;
    if (el.textContent && el.textContent.trim() !== '') return true;
    // For completely empty element, skip
    return false;
  });
  // If nothing found, fallback to the entire hero content block
  if (contentElems.length === 0 && contentWrapper) {
    contentElems = [contentWrapper];
  }

  // --- Build cells ---
  const cells = [
    headerRow,
    [bgImgElem ? bgImgElem : ''],
    [contentElems.length ? contentElems : '']
  ];

  // --- Create and replace table ---
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
