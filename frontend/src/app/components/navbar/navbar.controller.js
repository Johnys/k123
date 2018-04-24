/* globals window */
import states from '../../common/states';

class NavBarController {
  constructor($scope, $state) {
    this.$scope = $scope;
    this.$state = $state;
    this.states = states;
  }

  active(pages) {
    return pages.indexOf(window.location.hash.split('/')[1]) >= 0 ? 'active' : '';
  }

  goto(state) {
    this.$scope.currentState = state;
    this.$state.go(state);
  }
}

export default NavBarController;
