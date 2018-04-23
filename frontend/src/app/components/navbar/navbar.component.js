import template from './navbar.html';
import controller from './navbar.controller';
import '../../../style/navbar.scss';

const NavBar = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true,
};

export default NavBar;
