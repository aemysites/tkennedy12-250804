/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract all company blocks from the coe-articles container
  function extractCompanyBlocks(root) {
    // Get all .coe-article-company elements
    const companies = Array.from(root.querySelectorAll(':scope > .coe-article-company'));
    return companies.map(companyEl => {
      // Get logo and location from the corresponding previous .coe-article button
      let logo = null;
      let location = null;
      let btn = companyEl.previousElementSibling;
      while (btn && !(btn.classList && btn.classList.contains('coe-article'))) {
        btn = btn.previousElementSibling;
      }
      if (btn) {
        const imgDiv = btn.querySelector('.coe-article-image');
        if (imgDiv && imgDiv.style.backgroundImage) {
          const urlMatch = imgDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/i);
          if (urlMatch && urlMatch[1]) {
            logo = document.createElement('img');
            logo.src = urlMatch[1];
            logo.setAttribute('loading', 'lazy');
            logo.style.maxWidth = '120px';
            logo.style.height = 'auto';
          }
        }
        const locDiv = btn.querySelector('.coe-article-location');
        if (locDiv) {
          // Use a <div> for location (not a <br>), as in the source
          location = locDiv;
        }
      }
      // Company Name (from .coe-article-company)
      const companyName = companyEl.textContent.trim();
      // Description/content (next sibling .coe-article-content-body)
      let desc = companyEl.nextElementSibling;
      while (desc && !(desc.classList && desc.classList.contains('coe-article-content-body'))) {
        desc = desc.nextElementSibling;
      }
      // Use the element directly if exists, else null
      const descContent = desc || null;
      // Link: next .coe-article-controls sibling
      let controls = descContent ? descContent.nextElementSibling : companyEl.nextElementSibling;
      while (controls && !(controls.classList && controls.classList.contains('coe-article-controls'))) {
        controls = controls.nextElementSibling;
      }
      let link = null;
      if (controls) {
        const a = controls.querySelector('a');
        if (a) link = a;
      }
      return { logo, location, companyName, descContent, link };
    });
  }

  // Build row data: 5 columns per row, each cell is a company block
  const companies = extractCompanyBlocks(element);
  const columnsPerRow = 5;
  const tableRows = [];
  for (let i = 0; i < companies.length; i += columnsPerRow) {
    const rowCompanies = companies.slice(i, i + columnsPerRow);
    const cells = rowCompanies.map(block => {
      const cellContent = [];
      // Logo image
      if (block.logo) {
        cellContent.push(block.logo);
      }
      // Company name (bold)
      if (block.companyName) {
        const strong = document.createElement('strong');
        strong.textContent = block.companyName;
        cellContent.push(document.createElement('br'));
        cellContent.push(strong);
      }
      // Location (below company name)
      if (block.location && block.location.textContent.trim()) {
        cellContent.push(document.createElement('br'));
        cellContent.push(block.location);
      }
      // Description/body content (all <p>, <ul>, etc inside descContent)
      if (block.descContent && block.descContent.textContent.trim()) {
        for (let child of Array.from(block.descContent.children)) {
          cellContent.push(child);
        }
      }
      // Learn More link
      if (block.link) {
        cellContent.push(document.createElement('br'));
        cellContent.push(block.link);
      }
      return cellContent;
    });
    tableRows.push(cells);
  }

  // Compose final cells array
  const headerRow = ['Columns (columns20)'];
  const cells = [headerRow, ...tableRows];

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
