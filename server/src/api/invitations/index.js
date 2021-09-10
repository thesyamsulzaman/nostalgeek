const InvitationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'invitations',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const invitationsHandler = new InvitationsHandler(service, validator);
    server.route(routes(invitationsHandler));
  },
};
