import CrudService from '../../common/crud.service';

class SecretFriendService extends CrudService {
  constructor($http) {
    super($http, '/secretfriend');
  }

  resend(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.post(this.getURI(`${data.id}/resend`)), resolve, reject));
  }
}

export default SecretFriendService;
