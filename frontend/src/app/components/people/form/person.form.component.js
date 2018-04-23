import template from './person.form.html';
import controller from './person.form.controller';

const PersonForm = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true,
};

export default PersonForm;
