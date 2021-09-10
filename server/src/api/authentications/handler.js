class AuthenticationHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._service = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);
    const { email, password } = request.payload;
    const id = await this._usersService.verifyUserCredential(email, password);

    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });
    await this._service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'User successfully authenticated',
      data: {
        user: {},
        accessToken,
        refreshToken,
      },
    });

    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request, h) {
    this._validator.validatePutAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._service.verifyRefreshToken(refreshToken);
    const id = this._tokenManager.verifyRefreshToken(refreshToken);
    const accessToken = this._tokenManager.generateAccessToken({ id });

    const response = h.response({
      status: 'success',
      message: 'Refresh token has been updated',
      data: {
        accessToken,
      },
    });

    response.code(200);
    return response;
  }

  async deleteAuthenticationHandler(request) {
    this._validator.validateDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._service.verifyRefreshToken(refreshToken);
    await this._service.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token has been deleted',
    };
  }
}

module.exports = AuthenticationHandler;
