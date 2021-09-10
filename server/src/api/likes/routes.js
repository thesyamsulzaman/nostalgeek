const routes = (handler) => [
  {
    method: 'POST',
    path: '/invitations/{invitationId}/like-invitation',
    handler: handler.postLikeHandler,
    options: {
      auth: 'nostalgeek_jwt',
    },
  },

  {
    method: 'DELETE',
    path: '/invitations/{invitationId}/unlike-invitation',
    handler: handler.deleteLikeHandler,
    options: {
      auth: 'nostalgeek_jwt',
    },
  },
];

module.exports = routes;
