const icons = {
  gamepad: '<path d="M8.5 8h7a4.5 4.5 0 0 1 4.1 2.7l1.8 4.2a3 3 0 0 1-5.1 3.1l-1.5-1.7h-5.6L7.7 18a3 3 0 0 1-5.1-3.1l1.8-4.2A4.5 4.5 0 0 1 8.5 8Z"/><path d="M7 11v4M5 13h4M16 12h.01M18 14h.01"/>',
  sparkles: '<path d="m12 3 1.2 3.3L16.5 7.5l-3.3 1.2L12 12l-1.2-3.3-3.3-1.2 3.3-1.2L12 3Z"/><path d="m18.5 12 1 2.5L22 15.5l-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5ZM6 14l.8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8L6 14Z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/>',
  play: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 9 5 3-5 3V9Z"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  wallet: '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v14H6.5A2.5 2.5 0 0 1 4 16.5v-9Z"/><path d="M18 9h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2a3 3 0 0 1 0-6Z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  phone: '<path d="M6.5 3.5 9 7l-2 2a15 15 0 0 0 8 8l2-2 3.5 2.5c.4.3.6.8.4 1.3-.5 1.3-1.8 2.2-3.2 2.2C9.5 21 3 14.5 3 6.3 3 4.9 3.9 3.6 5.2 3.1c.5-.2 1 0 1.3.4Z"/>',
  facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z"/>',
  whatsapp: '<path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2.4 2.1 4 4.5 5l1.2-1.2 2.1 1c.4.2.5.7.3 1.1-.5 1-1.5 1.6-2.6 1.5-3.8-.4-6.8-3.4-7.2-7.2-.1-1.1.5-2.1 1.5-2.6.4-.2.9-.1 1.1.3l1 2.1L9 8.5Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  mapPin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};

export const icon = (name, className = '') => `
<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  ${icons[name] ?? icons.sparkles}
</svg>`;
