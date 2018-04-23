import angular from 'angular';
import router from '@uirouter/angularjs';
import PeopleService from './people.service';

const peopleModule = angular.module('people', [router, 'ngToast']);
peopleModule.service('peopleService', PeopleService);
require('./list/people.list');
require('./form/person.form');

export default peopleModule;
