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
]).directive('app', app);
