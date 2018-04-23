import angular from 'angular';
import router from '@uirouter/angularjs';
import navbar from './navbar.component';

const navbarModule = angular.module('navbar', [router]);
navbarModule.component('navbar', navbar);

export default navbarModule;
