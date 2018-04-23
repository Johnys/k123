import BaseController from '../../../common/base.controller';

class PersonFormController extends BaseController {
  constructor($scope, $state, ngToast, peopleService) {
    super(ngToast, $scope);
    this.scope = $scope;
    this.toast = ngToast;
    this.state = $state;
    this.service = peopleService;
    this.scope.person = { name: 'teste', email: 'teste@gmail.com' };
    this.scope.save = this.save.bind(this);
    this.scope.cancel = this.cancel.bind(this);
  }

  save(form) {
    this.clearApiErros(form);
    if (form.$valid) {
      let promise = this.service.save(this.scope.person);
      promise = this.processPromise(promise, 'Pessoa cadastrada com sucesso!', form);
      promise.then((result) => {
        if (result && !result.error) {
          this.cancel();
        }
        return result;
      });
    }
  }

  cancel() {
    this.state.go('peoplelist');
  }
}

export default PersonFormController;
