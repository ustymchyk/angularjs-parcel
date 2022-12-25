import templates from './templates';

export function getTemplate(componentName) {
  return templates[toKebabCase(componentName)] || '';
}

function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
