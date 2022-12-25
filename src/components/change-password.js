import { app } from '../app';
import { userService } from '../services';
import { getTemplate } from '../utils/getTemplate';

export const changePasswordComponent = 'changePassword';

controller.$inject = ['$scope', userService];

function controller($scope, userService) {
  $scope.password = '';

  $scope.changePassword = () => {
    userService.changePassword($scope.password);
    $scope.password = '';
  };
}

app.component(changePasswordComponent, {
  template: getTemplate(changePasswordComponent),
  controller,
});
