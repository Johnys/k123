class NavBarController {
  constructor($scope, $state) {
    this.$scope = $scope;
    this.$state = $state;
    $scope.goto = this.goto.bind(this);
  }

  goto(state) {
    this.$scope.currentState = state;
    this.$state.go(state);
  }
}

export default NavBarController;
