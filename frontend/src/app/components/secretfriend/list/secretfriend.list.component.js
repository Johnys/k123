import template from './secretfriend.list.html';
import controller from './secretfriend.list.controller';

const SecretFriendList = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true,
};

export default SecretFriendList;
