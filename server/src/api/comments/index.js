const CommentsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const commentsHandler = new CommentsHandler(service, validator);
    server.route(routes(commentsHandler));
  }
};
