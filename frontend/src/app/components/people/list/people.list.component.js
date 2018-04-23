import template from './people.list.html';
import controller from './people.list.controller';

const PeopleList = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'vm',
  bindToController: true,
};

export default PeopleList;
