class LikesHandler {
  constructor(service) {
    this._service = service;

    this.postLikeHandler = this.postLikeHandler.bind(this);
    this.deleteLikeHandler = this.deleteLikeHandler.bind(this);
  }

  async postLikeHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const { invitationId } = request.params;

    const invitation = await this._service.addLike(invitationId, ownerId);

    return {
      status: 'success',
      message: 'Invitation Successfully liked',
      data: invitation,
    };
  }

  async deleteLikeHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const { invitationId } = request.params;

    const invitation = await this._service.removeLike(invitationId, ownerId);

    return {
      status: 'success',
      message: 'Invitation Successfully unliked',
      data: invitation,
    };
  }
}

module.exports = LikesHandler;
