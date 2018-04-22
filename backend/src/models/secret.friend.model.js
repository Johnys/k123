import mongoose, { Schema } from 'mongoose';
import 'babel-polyfill';
import uuid from 'uuid';
import moment from 'moment';
import PersonModel from './person.model';
import { search } from './base.model';

const PersonFriendSchema = new Schema({
  person: mongoose.Schema.Types.ObjectId,
  friend: mongoose.Schema.Types.ObjectId,
});

const SecretFriendSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  revelation_date: {
    type: Date,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    default: (() => uuid.v4()),
  },
  drawn: [PersonFriendSchema],
}, {
  timestamps: true,
});

SecretFriendSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj.uuid;
    delete obj._id;
    delete obj.__v;
    delete obj.uuid;
    obj.drawns = obj.drawn.length;
    delete obj.drawn;
    obj.createdAt = moment(obj.createdAt).format('DD/MM/YYYY');
    obj.updatedAt = moment(obj.updatedAt).format('DD/MM/YYYY');
    obj.revelation_date = moment(obj.revelation_date).format('DD/MM/YYYY');
    return obj;
  },
});

SecretFriendSchema.statics.search = search;

/* eslint-disable camelcase */
SecretFriendSchema.statics.generate = function generate(name, revelation_date, people = []) {
  return new Promise((resolve, reject) => {
    let conditions = {};
    if (people && people.length > 0) {
      conditions = { uuid: { $in: people } };
    }
    PersonModel.findRandom(conditions, null, { limit: 100000 }, (err, result) => {
      if (err) return reject(err);
      if (!result || result.length === 0 || result.length === 1) return reject(new Error('É necessário ter mais de uma pessoa cadastrada no sistema'));
      const drawn = [];
      result.reduce((acc, person, index, array) => {
        (index < array.length - 1) ? acc.push({ person, friend: array[index + 1] }) : acc.push({ person, friend: array[0] });
        return acc;
      }, drawn);
      return new SecretFriendModel({ name, revelation_date, drawn }).save().then(resolve).catch(reject);
    });
  });
};


const SecretFriendModel = mongoose.models.SecretFriend || mongoose.model('SecretFriend', SecretFriendSchema);
export default SecretFriendModel;
