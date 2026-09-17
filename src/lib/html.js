export const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

export const isCurrentPath = (currentPath, href) => {
  if (href === '/') return currentPath === '/';
  return currentPath.startsWith(href);
};
