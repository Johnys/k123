class AppController {
  constructor($rootScope) {
    this.progress = false;
    $rootScope.$watch('progress', () => {
      this.progress = $rootScope.progress;
    });
  }
}

export default AppController;
