import angular from 'angular';
import SecretFriendForm from './secretfriend.form.component';

const secretFriendModule = angular.module('secretfriend');

secretFriendModule.config(($stateProvider) => {
  $stateProvider
    .state('secretfriendform', {
      url: '/secretfriendform',
      template: '<secretfriendform></secretfriendform>',
    });
});
secretFriendModule.component('secretfriendform', SecretFriendForm);
