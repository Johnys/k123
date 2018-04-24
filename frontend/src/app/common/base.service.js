class BaseService {
  constructor($http, uri) {
    this.http = $http;
    this.uri = uri;
  }

  threatPromisse(promise, resolve, reject) {
    return promise.then(result => this.threatPromiseThen(result, resolve, reject))
      .catch(err => reject(err));
  }

  threatPromiseThen(result, resolve, reject) {
    if (result.status === 200) {
      resolve(result.data);
    } else {
      reject({ error: true, message: 'Falha na requisição.' });
    }
  }

  getURI(param = null) {
    param = param ? `/${param}` : '';
    return `http://localhost:4567${this.uri}${param}`;
  }
}

export default BaseService;
