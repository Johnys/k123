import BaseController from './base.controller';

class CrudController extends BaseController {
  persist(form, promise, message) {
    this.clearApiErros(form);
    if (form.$valid) {
      this.progress(true);
      promise = this.processPromise(promise, message, form);
      promise.then((result) => {
        if (result && !result.error) {
          this.cancel();
        }
        this.progress(false);
        return result;
      });
    }
  }

  cancel() {

  }
}

export default CrudController;
