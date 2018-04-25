import moment from 'moment';
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
    this.scope.secretfriend = { name: '', revelation_date: '', people: [] };
    this.scope.selectedPeople = {};
    this.scope.selectAll = false;
    this.scope.people = [];
    this.findPeople();
  }

  findPeople() {
    this.progress(true);
    let promise = this.peopleService.find({ limit: 10000 });
    promise = this.processPromise(promise);
    promise.then((result) => {
      if (!result.error) {
        this.scope.people = result.docs;
        this.checkAll();
      }
      this.progress(false);
    });
  }

  save(form) {
    this.scope.secretfriend.people = Object.keys(this.scope.selectedPeople).filter(key => this.scope.selectedPeople[key]);
    if (this.scope.secretfriend.people.length < 2) {
      this.toast.warning('É necessário ao menos duas pessoas para realizar o sorteio');
    } else {
      const secretFriend = Object.assign({}, this.scope.secretfriend);
      secretFriend.revelation_date = moment(secretFriend.revelation_date).format('DD/MM/YYYY');
      this.persist(form, this.service.save(secretFriend), 'Sorteio gerado com sucesso!');
    }
  }

  cancel() {
    this.state.go(states.SECRETFRIEND_LIST);
  }

  checkAll() {
    this.scope.people.map((person) => {
      this.scope.selectedPeople[person.id] = this.scope.selectAll;
    });
  }

  checked(person) {
    return this.scope.selectedPeople[person.id];
  }
}

export default SecretFriendFormController;
