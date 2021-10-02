class CommentsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    this._validator.validateCommentPayload(request.payload);

    const { body } = request.payload;
    const { id: ownerId } = request.auth.credentials;
    const { invitationId } = request.params;

    const invitation = await this._service.addComment({
      body,
      invitationId,
      ownerId,
    });

    return h
      .response({
        status: "success",
        message: "Comment has been successfully added",
        data: invitation,
      })
      .code(201);
  }

  async deleteCommentHandler(request, h) {
    const { id: ownerId } = request.auth.credentials;
    const { invitationId, commentId } = request.params;

    const invitation = await this._service.deleteComment({
      invitationId,
      ownerId,
      commentId,
    });

    return h
      .response({
        status: "success",
        message: "Comment has been successfully deleted",
        data: invitation,
      })
      .code(203);
  }
}

module.exports = CommentsHandler;
