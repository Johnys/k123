import moment from 'moment';
import SecretFriendModel from '../models/secret.friend.model';
import MailClient, { EMAIL_TYPES } from '../lib/mailer/mailer.client';
import BaseController from './base.controller';
import PersonModel from '../models/person.model';

class SecretFriendController extends BaseController {
  index(req, res) {
    super.bindResultModel(SecretFriendModel.search(req.params), res);
  }

  async create(req, res) {
    const params = this.secretFriendParams(req.body);
    try {
      const secretFriend = await SecretFriendModel.generate(params.name, params.revelation_date, params.people);
      this.sendEmails(secretFriend, (err) => {
        err ? res.json(super.formatApiError(err)) : super.processResponseModel(res, secretFriend);
      });
    } catch (err) {
      res.json(super.formatApiError(err));
    }
  }

  async resendEmail(req, res) {
    const secretFriend = await SecretFriendModel.findOne({ uuid: req.params.id });
    if (!secretFriend) return res.sendStatus(500);
    return this.sendEmails(secretFriend, err => (err ? res.status(500).json(super.formatApiError(err)) : res.sendStatus(200)));
  }

  sendEmails(secretFriend, callback) {
    this.loadDrawn(secretFriend)
      .then((drawn) => {
        drawn.forEach(member => MailClient.send(member.person.email, EMAIL_TYPES.secret_friend.name, {
          secret_friend_name: secretFriend.name,
          name: member.person.name,
          friend: member.friend.name,
          friend_email: member.friend.email,
        }));
        callback();
      })
      .catch(err => callback(err));
  }

  /* eslint-disable */
  async loadDrawn(secretFriend) {
    const people = {};
    const drawn = secretFriend.drawn;
    const newDrawn = []
    for (let i = 0; i < secretFriend.drawn.length; i += 1) {
      if (!people[drawn[i].person]) people[drawn[i].person] = await PersonModel.findById(drawn[i].person);
      if (!people[drawn[i].friend]) people[drawn[i].friend] = await PersonModel.findById(drawn[i].friend);
      newDrawn[i] = {};
      newDrawn[i].person = people[drawn[i].person].toJSON();
      newDrawn[i].friend = people[drawn[i].friend].toJSON();
    }
    return newDrawn;
  }
  /* eslint-enable */

  secretFriendParams(params) {
    params = super.filterParams(params, ['name', 'revelation_date', 'people']);
    if (params.revelation_date) {
      params.revelation_date = moment(params.revelation_date, 'DD/MM/YYYY').toDate();
    }
    return params;
  }
}

export default SecretFriendController;
