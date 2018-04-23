import angular from 'angular';
import NavBar from './navbar/navbar';
import People from './people/people';

export default angular.module('app.components', [NavBar.name, People.name]);
