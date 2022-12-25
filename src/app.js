import angular from 'angular';

const app = angular.module('app', []);

angular.element(function () {
  angular.bootstrap(document.querySelector('body'), ['app']);
});

export { app };
