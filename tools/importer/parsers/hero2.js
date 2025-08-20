/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row matches example
  const headerRow = ['Hero (hero2)'];

  // --- Extract background image for the first content row (after header)
  let bgImgElem = null;
  // Try to get desktopPoster from CSS variable (preferred)
  const videoWrapper = element.querySelector('.herov2__video-wrapper');
  if (videoWrapper) {
    const wrapperStyle = videoWrapper.getAttribute('style') || '';
    const desktopPosterMatch = wrapperStyle.match(/--desktopPoster:\s*url\(([^)]*)\)/);
    if (desktopPosterMatch && desktopPosterMatch[1]) {
      const url = desktopPosterMatch[1].replace(/['"]/g, '');
      if (url) {
        bgImgElem = document.createElement('img');
        bgImgElem.src = url;
        bgImgElem.alt = '';
      }
    }
    // If no desktopPoster in style, fallback to <video> element
    if (!bgImgElem) {
      const video = videoWrapper.querySelector('video');
      if (video) {
        let posterUrl = video.getAttribute('desktopposter') || video.getAttribute('poster');
        if (posterUrl && posterUrl !== '#') {
          bgImgElem = document.createElement('img');
          bgImgElem.src = posterUrl;
          bgImgElem.alt = '';
        }
      }
    }
  }

  // --- Extract all hero text content for the second content row
  let heroContentElems = [];
  const contentWrapper = element.querySelector('.herov2__content-wrapper');
  if (contentWrapper) {
    // Get all direct children (headings, paragraphs, spans, etc)
    Array.from(contentWrapper.childNodes).forEach((node) => {
      if (node.nodeType === 1) { // Element node
        // Only include non-empty elements
        if (node.textContent && node.textContent.trim()) {
          heroContentElems.push(node);
        }
      } else if (node.nodeType === 3) { // Text node
        const txt = node.textContent.trim();
        if (txt) {
          const span = document.createElement('span');
          span.textContent = txt;
          heroContentElems.push(span);
        }
      }
    });
  }
  // If contentWrapper is missing or empty, fallback to the main title h1
  if (heroContentElems.length === 0) {
    const h1 = element.querySelector('h1');
    if (h1 && h1.textContent.trim()) {
      heroContentElems.push(h1);
    }
  }
  // Fallback: If still no text content, try most likely wrapper
  if (heroContentElems.length === 0) {
    const fallback = element.querySelector('.herov2__wrapper');
    if (fallback && fallback.textContent.trim()) {
      heroContentElems.push(fallback);
    }
  }

  // Build final table structure
  const cells = [
    headerRow, // Header row
    [bgImgElem ? bgImgElem : ''],     // First content row: background image
    [heroContentElems.length > 0 ? heroContentElems : ''] // Second content row: all text content
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}