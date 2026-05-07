// Aggregates all category arrays into the original VALUABLES_DATA global
// and provides the tv() helper to read embedded translations.

const VALUABLES_DATA = [
  ...GEMS_VALUABLES,
  ...JEWELRY_VALUABLES,
  ...ELECTRONICS_VALUABLES,
  ...TECH_VALUABLES,
  ...SHOES_VALUABLES,
  ...MISC_VALUABLES,
  ...MISSION_ITEMS_VALUABLES,
];

/**
 * Translate a field on a valuable item using its embedded translations.
 * Falls back to the English (top-level) value when no translation exists.
 *
 * Usage:  tv(item, 'name')  or  tv(item, 'commonLocation')
 */
function tv(item, field) {
  const lang = i18n.getLang();
  if (lang !== 'en' && item.translations && item.translations[lang] && item.translations[lang][field] !== undefined) {
    return item.translations[lang][field];
  }
  return item[field];
}
