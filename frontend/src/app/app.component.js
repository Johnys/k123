import 'jquery/dist/jquery';
import 'popper.js/dist/umd/popper';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ng-toast/dist/ngToast.min';
import 'ng-toast/dist/ngToast.min.css';
import 'ui-bootstrap4';
import controller from './app.controller';
import '../style/app.scss';
import template from './app.html';

const app = () => ({
  template,
  controller,
  controllerAs: 'app',
  bindToController: true,
});

export default app;
