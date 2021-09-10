class UsersHandler {
  constructor(usersService, validator) {
    this._service = usersService;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserInfoHandler = this.getUserInfoHandler.bind(this);
    this.putUserHandler = this.putUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);

    const {
      fullname,
      email,
      password,
      profile_picture = null,
    } = request.payload;

    if (profile_picture) {
      this._validator.validateProfilePictureHeaders(
        profile_picture.hapi.headers
      );
    }

    const userId = await this._service.addUser({
      fullname,
      email,
      password,
      profile_picture,
    });

    return h
      .response({
        status: 'success',
        message: 'User has been successfully created',
        data: {
          userId,
        },
      })
      .code(201);
  }

  async putUserHandler(request, h) {
    this._validator.validateUserProfilePayload(request.payload);

    const {
      fullname,
      email,
      password,
      profile_picture = null,
      oldProfilePictureName = null,
    } = request.payload;

    const { id: credentialId } = request.auth.credentials;

    if (profile_picture && oldProfilePictureName) {
      this._validator.validateProfilePictureHeaders(
        profile_picture.hapi.headers
      );
    }

    const userId = await this._service.editUserById(credentialId, {
      fullname,
      email,
      password,
      profile_picture,
      oldProfilePictureName,
    });

    return h
      .response({
        status: 'success',
        message: 'User has been successfully updated',
        data: {
          userId
        },
      })
      .code(201);
  }

  async getUserInfoHandler(request, h) {
    const { id: userId } = request.auth.credentials;

    const userInfo = await this._service.getUserInfo(
      userId
    );

    return h
      .response({
        status: 'success',
        message: 'User info has been fetched',
        data: userInfo,
      })
      .code(200);
  }
}

module.exports = UsersHandler;
