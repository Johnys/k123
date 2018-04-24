/* globals window */
import BaseController from '../../../common/base.controller';
import states from '../../../common/states';

class PeopleListController extends BaseController {
  constructor($scope, $state, ngToast, peopleService, $rootScope) {
    super(ngToast, $scope, $rootScope);
    this.state = $state;
    this.service = peopleService;
    this.scope.people = [];
    this.scope.total = 0;
    this.scope.page = 1;
    this.scope.limit = 10;
    this.scope.search = '';
    this.scope.$watch('search', () => this.find());
    this.find();
  }

  new() {
    this.state.go(states.PERSON_FORM);
  }

  getSearchQuery() {
    const query = { limit: this.scope.limit, offset: this.scope.page };
    if (this.scope.search && this.scope.search.length > 0) {
      query.name = this.scope.search;
      query.email = this.scope.search;
    }
    return query;
  }

  find() {
    this.progress(true);
    let promise = this.service.find(this.getSearchQuery());
    promise = this.processPromise(promise);
    promise.then((result) => {
      if (!result.error) {
        this.scope.people = result.docs;
        this.scope.total = result.total;
        this.scope.page = result.page;
        this.scope.limit = result.limit;
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
