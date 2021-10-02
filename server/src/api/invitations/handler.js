class InvitationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postInvitationHandler = this.postInvitationHandler.bind(this);
    this.getAllInvitationsHandler = this.getAllInvitationsHandler.bind(this);
    this.getInvitationByIdHandler = this.getInvitationByIdHandler.bind(this);
    this.getAllInvitationsByOwnerIdHandler = this.getAllInvitationsByOwnerIdHandler.bind(this);
    this.deleteInvitationHandler = this.deleteInvitationHandler.bind(this);
    this.putInvitationByIdHandler = this.putInvitationByIdHandler.bind(this);
  }

  async postInvitationHandler(request, h) {
    this._validator.validateInvitationPayload(request.payload);

    const { title, body, image = null } = request.payload;
    const { id: ownerId } = request.auth.credentials;

    if (image) {
      this._validator.validateInvitationImageHeaders(image.hapi.headers);
    }

    const invitation = await this._service.addInvitation({
      title,
      body,
      image,
      owner: ownerId,
      likeCount: 0,
      commentCount: 0
    });

    return h
      .response({
        status: 'success',
        message: 'Invitation has successfully been created',
        data: invitation,
      })
      .code(201);
  }

  async getAllInvitationsHandler(request, h) {
    const results = await this._service.getAllInvitations();

    return h
      .response({
        status: 'success',
        message: 'Invitations has successfully been fetched',
        data: results,
      })
      .code(201);
  }

  async getInvitationByIdHandler(request, h) {
    const { invitationId } = request.params;
    const result = await this._service.getInvitationById(invitationId);

    return h
      .response({
        status: 'success',
        message: 'Invitations has successfully been fetched',
        data: result,
      })
      .code(200);
  }

  async getAllInvitationsByOwnerIdHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const result = await this._service.getInvitationById(ownerId);

    return h
      .response({
        status: 'success',
        message: 'Invitations has successfully been fetched',
        data: result,
      })
      .code(200);
  }

  async deleteInvitationHandler(request, h) {
    const { invitationId } = request.params;
    const { id: ownerId } = request.auth.credentials;

    await this._service.verifyInvitationOwner(invitationId, ownerId);
    await this._service.deleteInvitation(invitationId);

    return h
      .response({
        status: 'success',
        message: 'Invitations has successfully been deleted',
        data: { id: invitationId }
      })
      .code(203);
  }

  async putInvitationByIdHandler(request, h) {
    this._validator.validateInvitationPayload(request.payload);

    const {
      title, body, image = null, oldImageName = null
    } = request.payload;

    const { invitationId } = request.params;
    const { id: ownerId } = request.auth.credentials;

    if (image && oldImageName) {
      this._validator.validateInvitationImageHeaders(image.hapi.headers);
    }

    await this._service.verifyInvitationOwner(invitationId, ownerId);
    const invitation = await this._service.editInvitationById(invitationId, {
      title,
      body,
      image,
      oldImageName,
    });

    return h
      .response({
        status: 'success',
        message: 'Invitation has successfully been updated',
        data: invitation,
      })
      .code(203);
  }
}

module.exports = InvitationsHandler;
