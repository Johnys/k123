/* globals window */
import BaseController from '../../../common/base.controller';

class SecretFriendListController extends BaseController {
  constructor($scope, $rootScope, $state, ngToast, secretFriendService) {
    super(ngToast, $scope, $rootScope);
    this.scope = $scope;
    this.scope.secretsFriends = [];
    this.state = $state;
    this.service = secretFriendService;
    this.find();
  }

  new() {
    this.state.go('secretFriendform');
  }

  find() {
    this.progress(true);
    let promise = this.service.find({});
    promise = this.processPromise(promise);
    promise.then((result) => {
      if (!result.error) {
        this.scope.secretsFriends = result;
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
