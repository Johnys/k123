class PeopleListController {
  constructor($scope, $state, peopleService) {
    this.scope = $scope;
    this.state = $state;
    this.service = peopleService;
    this.scope.people = [{ id: 0, name: 'teste', email: 'teste@teste.com' }];
    this.scope.edit = this.edit.bind(this);
    this.scope.remove = this.remove.bind(this);
    this.scope.new = this.new.bind(this);
  }

  new() {
    this.state.go('personform');
  }

  edit(person) {

  }

  remove(person) {

  }
}

export default PeopleListController;
