import { app } from '../app';
import { userService } from '../services';
import { getTemplate } from '../utils/getTemplate';

export const userViewComponent = 'userView';

controller.$inject = ['$scope', userService];

function controller($scope, userService) {
  $scope.user = userService;
}

app.component(userViewComponent, {
  template: getTemplate(userViewComponent),
  controller,
});
