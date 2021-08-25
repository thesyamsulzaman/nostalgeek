require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
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

// Invitations
const invitations = require('./api/invitations');
const InvitationsService = require('./services/postgres/InvitationsService');
const InvitationsValidator = require('./validator/invitations');

/**
 * Storage Services
 */

const profilePicturesStorage = new StorageService(
  path.resolve(__dirname, 'api/users/file/pictures'),
);

const invitationImagesStorage = new StorageService(
  path.resolve(__dirname, 'api/invitations/file/pictures'),
);

/**
 * Main Services
 */

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const invitationsService = new InvitationsService();

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

  // Registering the external plugin
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // defining authentication strategy
  server.auth.strategy('nostalgeek_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
        storageService: profilePicturesStorage,
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

    {
      plugin: invitations,
      options: {
        service: invitationsService,
        storageService: invitationImagesStorage,
        validator: InvitationsValidator,
      },
    },

  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
