const UsersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server, { service, storageService, validator }) => {
    const usersHandler = new UsersHandler(service, storageService, validator);
    server.route(routes(usersHandler));
  },
};
