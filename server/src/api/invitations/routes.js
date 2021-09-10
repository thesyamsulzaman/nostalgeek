const path = require('path');

const routes = (handler) => [
  /**
   * @swagger
   * components:
   *  schemas:
   *    Invitation:
   *      type: object
   *      required:
   *        - title
   *        - body
   *        - image
   *      properties:
   *        - title:
   *            type: string
   *        - body
   *            type: string
   *        - image
   *            type: string
   */

  {
    method: 'POST',
    path: '/invitations',
    handler: handler.postInvitationHandler,
    options: {
      notes: 'You need to pass valid credentials',
      description: 'Adding a new Invitation Data',
      tags: ['api'],

      auth: 'nostalgeek_jwt',
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
    path: '/invitations',
    handler: handler.getAllInvitationsHandler,
    options: {
      notes: 'You dont need to pass anything',
      description: 'Getting all of the Invitations Data',
      tags: ['api'],
    },
  },

  {
    method: 'GET',
    path: '/invitations/{invitationId}',
    handler: handler.getInvitationByIdHandler,
    options: {
      notes: 'You need to pass invitationId',
      description: 'Getting a specified Invitation Data',
      tags: ['api'],
    },
  },

  {
    method: 'GET',
    path: '/users/{ownerId}/invitations',
    handler: handler.getAllInvitationsByOwnerIdHandler,
    options: {
      notes: 'You need to pass ownerId',
      description: 'Getting a specified Invitations Data by Owner Id',
      tags: ['api'],
    },
  },

  {
    method: 'GET',
    path: '/invitations/{invitationId}/images/{param*}',
    options: {
      notes: 'You need to pass invitationId',
      description: 'Getting an associated image from Invitation',
      tags: ['api'],
    },
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file/pictures'),
      },
    },
  },

  {
    method: 'DELETE',
    path: '/invitations/{invitationId}',
    handler: handler.deleteInvitationHandler,
    options: {
      auth: 'nostalgeek_jwt',
      notes: 'You need to pass invitationId',
      description: 'Delete invitation by Id',
      tags: ['api'],
    },
  },
  {
    method: 'PUT',
    path: '/invitations/{invitationId}',
    handler: handler.putInvitationByIdHandler,
    options: {
      auth: 'nostalgeek_jwt',
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 500000,
      },
      notes: 'You need to pass down valid invitation credentials',
      description: 'Edit invitation by Id',
      tags: ['api'],
    },
  },
];

module.exports = routes;
