import CrudService from '../../common/crud.service';

class PeopleService extends CrudService {
  constructor($http) {
    super($http, '/person');
  }
}

export default PeopleService;
