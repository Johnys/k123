import BaseService from './base.service';

class CrudService extends BaseService {
  save(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.post(this.getURI(), data), resolve, reject));
  }
  update(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.put(this.getURI(data.id), data), resolve, reject));
  }
  remove(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.delete(this.getURI(data.id)), resolve, reject));
  }
  find(data) {
    return new Promise((resolve, reject) => this.threatPromisse(this.http.get(this.getURI(), data), resolve, reject));
  }
}

export default CrudService;
