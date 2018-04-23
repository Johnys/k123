import BaseService from './base.service';

class CrudService extends BaseService {
  save(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.post(this.getURI(), data), resolve, reject));
  }
}

export default CrudService;
