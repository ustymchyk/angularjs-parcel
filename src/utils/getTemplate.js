import templates from './templates';

export function getTemplate(componentName) {
  return templates[componentName] || '';
}
