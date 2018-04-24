import angular from 'angular';
import NavBar from './navbar/navbar';
import People from './people/people';
import SecretFriend from './secretfriend/secretfriend';

export default angular.module('app.components', [NavBar.name, People.name, SecretFriend.name]);
