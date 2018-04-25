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
