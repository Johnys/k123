import BaseController from './base.controller';
import PersonModel from '../models/person.model';

class PersonController extends BaseController {
  index(req, res) {
    super.bindResultModel(PersonModel.search(req.params), res);
  }

  create(req, res) {
    const personModel = new PersonModel(this.personParams(req.body));
    super.bindResultModel(personModel.save(), res);
  }

  update(req, res) {
    const params = req.body;
    const promise = PersonModel.findOneAndUpdate({ uuid: params.id }, this.personParams(params), { new: true });
    super.bindResultModel(promise, res);
  }

  delete(req, res) {
    PersonModel.remove({ uuid: req.body.id }, (err) => {
      res.sendStatus(err ? 500 : 200);
    });
  }

  personParams(params) {
    return super.filterParams(params, ['name', 'email']);
  }

}

export default PersonController;
