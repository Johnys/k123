import SecretFriendController from '../controllers/secret.friend.controller';

export default {
  '/secretfriend': { to: SecretFriendController, action: 'index', secure: false },
  '/secretfriend POST': { to: SecretFriendController, action: 'create', secure: false },
  '/secretfriend/:id/resend POST': { to: SecretFriendController, action: 'resendEmail', secure: false },
};
