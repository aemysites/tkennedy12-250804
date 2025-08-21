/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main <section> inside the given element
  const section = element.querySelector('section');
  if (!section) return;

  // Find the content container
  const parsys = section.querySelector('.parsys');
  if (!parsys) return;

  // Find all .text-component blocks (first is heading, rest are columns)
  const textComponents = parsys.querySelectorAll('.text-component');
  if (!textComponents || textComponents.length === 0) return;

  // First .text-component is the heading, remaining are cards
  const headingComponent = textComponents[0];
  const columnComponents = Array.from(textComponents).slice(1);

  // Row 1: header (block name, 1 column)
  const headerRow = ['Columns (columns2)'];

  // Row 2: heading in first cell, then the rest of the cards in subsequent columns
  const secondRow = [headingComponent, ...columnComponents];

  // Create the table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
