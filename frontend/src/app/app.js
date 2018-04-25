import angular from 'angular';
import router from '@uirouter/angularjs';
import ngSantanize from 'angular-sanitize';
import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ng-toast/dist/ngToast.min';
import 'ng-toast/dist/ngToast.min.css';
import 'ui-bootstrap4';
import app from './app.component';
import Components from './components/components';

angular.module('MyApp', [
  router,
  ngSantanize,
  'ngToast',
  'ui.bootstrap',
  Components.name,
]).directive('app', app);
