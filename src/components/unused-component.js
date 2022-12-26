import { app } from '../app';
import { getTemplate } from '../utils/getTemplate';

export const unusedComponent = unusedComponent;

app.component(unusedComponent, {
  template: getTemplate(unusedComponent),
  controller: function () {},
});
