class BaseController {
  constructor(toast, scope, rootScope) {
    this.toast = toast;
    this.scope = scope;
    this.rootScope = rootScope;
  }
  progress(enable) {
    this.rootScope.$applyAsync(() => {
      this.rootScope.progress = enable;
    });
  }
  threatError(promise) {
    return promise.catch((err) => {
      this.toast.create({
        content: err.message, timeout: 2000, dismissButton: true, maxNumber: 1, compileContent: true,
      });
      this.progress(false);
    });
  }
  bindSucessResult(promise, message, form) {
    return promise.then((result) => {
      if (!result.error) {
        if (message) {
          this.toast.success(message);
          this.progress(false);
        }
      } else {
        this.showErrors(result, form);
      }
      return result;
    });
  }
  showErrors(result, form) {
    this.toast.create({
      content: 'Ops....', timeout: 2000, dismissButton: true, maxNumber: 1, compileContent: true,
    });
    if (form) {
      Object.keys(result.errors).map((field) => {
        if (form[field]) {
          form[field].$$attr.$addClass('is-invalid');
          form[field].$setValidity('api', false);
          form[field].errorMessage = result.errors[field].message;
        }
      });
    }
    this.progress(false);
  }
  processPromise(promise, message, form) {
    promise = this.bindSucessResult(promise, message, form);
    return this.threatError(promise);
  }
  clearApiErros(form) {
    form.$$controls.map((control) => {
      form[control.$name].$setValidity('api', true);
      form[control.$name].$$attr.$removeClass('is-invalid');
    });
  }
}

export default BaseController;
