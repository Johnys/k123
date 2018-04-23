import angular from 'angular';
import PersonForm from './person.form.component';

const peopleModule = angular.module('people');

peopleModule.config(($stateProvider) => {
  $stateProvider
    .state('personform', {
      url: '/personform',
      template: '<personform></personform>',
    });
});
peopleModule.component('personform', PersonForm);
