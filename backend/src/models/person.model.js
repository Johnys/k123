import mongoose, { Schema } from 'mongoose';
import uuid from 'uuid';
import moment from 'moment';
import randon from 'mongoose-simple-random';
import mongoosePaginate from 'mongoose-paginate';
import { search } from './base.model';

const validateEmail = (email) => {
  const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
  return emailRegex.test(email);
};

const PersonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validateEmail,
  },
  uuid: {
    type: String,
    required: true,
    default: (() => uuid.v4()),
  },
}, {
  timestamps: true,
});

PersonSchema.set('toJSON', {
  virtuals: true,
  transform(doc, obj) {
    obj.id = obj.uuid;
    delete obj._id;
    delete obj.__v;
    delete obj.uuid;
    obj.createdAt = moment(obj.createdAt).format('DD/MM/YYYY');
    obj.updatedAt = moment(obj.updatedAt).format('DD/MM/YYYY');
    return obj;
  },
});

PersonSchema.plugin(randon);

PersonSchema.path('email')
  .validate(function validate(email) {
    return new Promise((resolve, reject) => {
      PersonModel.search({ email })
        .then((person) => {
          (person.docs.length === 0 || person.docs[0].uuid === this.uuid) ? resolve() : reject();
        }).catch((err) => {
          reject(err);
        });
    });
  }, 'Email já em uso');

PersonSchema.statics.search = function searchPerson(params = {}) {
  return search.bind(this)(params, 'name');
};

PersonSchema.plugin(mongoosePaginate);


const PersonModel = mongoose.models.Person || mongoose.model('Person', PersonSchema);
export default PersonModel;
