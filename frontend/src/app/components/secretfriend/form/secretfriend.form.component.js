import template from './secretfriend.form.html';
import controller from './secretfriend.form.controller';

const SecretFriendForm = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true,
};

export default SecretFriendForm;
