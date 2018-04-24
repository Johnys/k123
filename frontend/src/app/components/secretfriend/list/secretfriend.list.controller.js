import BaseController from '../../../common/base.controller';
import states from '../../../common/states';

class SecretFriendListController extends BaseController {
  constructor($scope, $rootScope, $state, ngToast, secretFriendService) {
    super(ngToast, $scope, $rootScope);
    this.scope = $scope;
    this.scope.secretsFriends = [];
    this.scope.total = 0;
    this.scope.page = 1;
    this.scope.limit = 10;
    this.state = $state;
    this.service = secretFriendService;
    this.scope.$watch('search', () => this.find());
    this.find();
  }

  new() {
    this.state.go(states.SECRETFRIEND_FORM);
  }

  getSearchQuery() {
    const query = { limit: this.scope.limit, offset: this.scope.page };
    if (this.scope.search && this.scope.search.length > 0) {
      query.name = this.scope.search;
    }
    return query;
  }

  find() {
    this.progress(true);
    let promise = this.service.find(this.getSearchQuery());
    promise = this.processPromise(promise);
    promise.then((result) => {
      if (!result.error) {
        this.scope.secretsFriends = result.docs;
        this.scope.total = result.total;
        this.scope.limit = result.limit;
      }
      this.progress(false);
    });
  }

  resend(secretFriend) {
    this.progress(true);
    const promise = this.service.resend(secretFriend);
    this.processPromise(promise, 'Emails reenviados com sucesso!');
  }
}

export default SecretFriendListController;
