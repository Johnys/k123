/* globals window */
import BaseController from '../../../common/base.controller';
import states from '../../../common/states';

class PeopleListController extends BaseController {
  constructor($scope, $state, ngToast, peopleService, $rootScope) {
    super(ngToast, $scope, $rootScope);
    this.state = $state;
    this.service = peopleService;
    this.scope.people = [];
    this.find();
  }

  new() {
    this.state.go(states.PERSON_FORM);
  }

  find() {
    this.progress(true);
    let promise = this.service.find({});
    promise = this.processPromise(promise);
    promise.then((result) => {
      if (!result.error) {
        this.scope.people = result;
        this.scope.$apply();
      }
      this.progress(false);
    });
  }

  edit(person) {
    this.state.go(states.PERSON_FORM, person);
  }

  remove(person) {
    if (window.confirm(`Deseja excluir a pessoa: ${person.name}`)) {
      this.progress(true);
      let promise = this.service.remove(person);
      promise = this.processPromise(promise, 'Pessoa excluida com sucesso!');
      promise.then((result) => {
        if (!result.error) {
          this.find();
        }
        this.progress(false);
      });
    }
  }
}

export default PeopleListController;
