import angular from 'angular';
import router from '@uirouter/angularjs';
import ngSantanize from 'angular-sanitize';
import app from './app.component';
import Components from './components/components';

angular.module('MyApp', [
  router,
  ngSantanize,
  'ngToast',
  Components.name,
]).run($rootScope => ($rootScope.progress = false)).directive('app', app);
