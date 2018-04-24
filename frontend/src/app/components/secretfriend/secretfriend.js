import angular from 'angular';
import router from '@uirouter/angularjs';
import SecretFriendService from './secretfriend.service';

const secretFriendModule = angular.module('secretfriend', [router, 'ngToast']);
secretFriendModule.service('secretFriendService', SecretFriendService);
require('./list/secretfriend.list');

export default secretFriendModule;
