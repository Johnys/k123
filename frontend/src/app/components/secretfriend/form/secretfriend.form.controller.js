import CrudController from '../../../common/crud.controller';
import states from '../../../common/states';

class SecretFriendFormController extends CrudController {
  constructor($scope, $state, ngToast, peopleService, secretFriendService, $rootScope) {
    super(ngToast, $scope, $rootScope);
    this.scope = $scope;
    this.toast = ngToast;
    this.state = $state;
    this.peopleService = peopleService;
    this.service = secretFriendService;
    this.scope.person = { name: $state.params.name, email: $state.params.email, id: $state.params.id };
  }

  save(form) {
    this.persist(form, this.service.save(this.scope.person), 'Pessoa cadastrada com sucesso!');
  }

  cancel() {
    this.state.go(states.SECRETFRIEND_LIST);
  }
}

export default SecretFriendFormController;
