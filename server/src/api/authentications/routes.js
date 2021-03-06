const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/login',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/users/refresh-auth',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/users/logout',
    handler: handler.deleteAuthenticationHandler,
  },
];

module.exports = routes;
