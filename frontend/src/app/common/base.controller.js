class BaseController {
  constructor(toast, scope) {
    this.toast = toast;
    this.scope = scope;
  }
  threatError(promise) {
    return promise.catch((err) => {
      this.toast.create({
        content: err.message, timeout: 2000, dismissButton: true, maxNumber: 1, compileContent: true,
      });
      this.scope.$apply();
    });
  }
  bindSucessResult(promise, message, form) {
    return promise.then((result) => {
      if (!result.error) {
        this.toast.success(message);
        this.scope.$apply();
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
    Object.keys(result.errors).map((field) => {
      if (form[field]) {
        form[field].$$attr.$addClass('is-invalid');
        form[field].$setValidity('api', false);
        form[field].errorMessage = result.errors[field].message;
      }
    });
    this.scope.$apply();
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
