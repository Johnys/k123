import CrudController from '../../../common/crud.controller';
import states from '../../../common/states';

class PersonFormController extends CrudController {
  constructor($scope, $state, ngToast, peopleService, $rootScope) {
    super(ngToast, $scope, $rootScope);
    this.scope = $scope;
    this.toast = ngToast;
    this.state = $state;
    this.service = peopleService;
    this.scope.person = { name: $state.params.name, email: $state.params.email, id: $state.params.id };
  }

  save(form) {
    this.persist(form, this.service.save(this.scope.person), 'Participante cadastrado com sucesso!');
  }

  update(form) {
    this.persist(form, this.service.update(this.scope.person), 'Participante alterado com sucesso!');
  }

  cancel() {
    this.state.go(states.PEOPLE_LIST);
  }
}

export default PersonFormController;
