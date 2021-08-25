const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
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
    path: '/users/profile_picture/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/pictures'),
      },
    },
  },

];

module.exports = routes;
