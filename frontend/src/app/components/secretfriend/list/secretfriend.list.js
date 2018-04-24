import angular from 'angular';
import SecretFriendList from './secretfriend.list.component';

const secretFriendModule = angular.module('secretfriend');

secretFriendModule.config(($stateProvider) => {
  $stateProvider
    .state('secretfriendlist', {
      url: '/secretfriendlist',
      template: '<secretfriendlist></secretfriendlist>',
    });
});
secretFriendModule.component('secretfriendlist', SecretFriendList);
