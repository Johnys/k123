import PersonController from '../controllers/person.controller';

export default {
  '/person': { to: PersonController, action: 'index', secure: false },
  '/person POST': { to: PersonController, action: 'create', secure: false },
  '/person/:id PUT': { to: PersonController, action: 'update', secure: false },
  '/person/:id DELETE': { to: PersonController, action: 'delete', secure: false },
};
