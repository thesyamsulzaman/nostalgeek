require('dotenv').config();

const Hapi = require('@hapi/hapi');
const path = require('path');
const ClientError = require('./exceptions/ClientError');

// Users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');
const StorageService = require('./services/storage/StorageService');

// Authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const { TokenManager } = require('./lib');
const AuthenticationsValidator = require('./validator/authentications');

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const storageService = new StorageService(
  path.resolve(__dirname, 'api/users/file/pictures'),
);

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response instanceof Error) {
      console.error(response);
    }

    return response.continue || response;
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        storageService,
        validator: UsersValidator,
      },
    },

    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },

  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
