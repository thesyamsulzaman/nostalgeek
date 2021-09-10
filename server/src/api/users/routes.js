const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users/register',
    handler: handler.postUserHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
    },
  },
  {
    method: 'GET',
    path: '/users/info',
    handler: handler.getUserInfoHandler,
    options: {
      auth: 'nostalgeek_jwt',
    },
  },

  {
    method: 'GET',
    path: '/users/info/profile-pictures/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/pictures'),
      },
    },
  },

  {
    method: 'PUT',
    path: '/users/edit',
    handler: handler.putUserHandler,
    options: {
      auth: 'nostalgeek_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
    },
  },
];

module.exports = routes;
