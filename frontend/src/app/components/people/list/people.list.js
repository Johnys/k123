import angular from 'angular';
import PeopleList from './people.list.component';

const peopleModule = angular.module('people');

peopleModule.config(($stateProvider) => {
  $stateProvider
    .state('peoplelist', {
      url: '/peoplelist',
      template: '<peoplelist></peoplelist>',
    });
});
peopleModule.component('peoplelist', PeopleList);
