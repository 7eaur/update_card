export const renderSectionHeader = ({ eyebrow, title, description = '', align = 'center' }) => `
<header class="section-heading section-heading--${align}">
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h2>${title}</h2>
  ${description ? `<p>${description}</p>` : ''}
</header>`;
