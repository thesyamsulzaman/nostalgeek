const routes = (handler) => [
  {
    method: 'POST',
    path: '/invitations/{invitationId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'nostalgeek_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/invitations/{invitationId}/comments/{commentId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'nostalgeek_jwt'
    }
  },
];

module.exports = routes;
