class UsersHandler {
  constructor(usersService, storageService, validator) {
    this._service = usersService;
    this._storageService = storageService;
    this._validator = validator;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const {
      fullname, email, password, profile_picture
    } = request.payload;

    this._validator.validateUserPayload({
      fullname, email, password, profile_picture
    });

    this._validator.validateProfilePictureHeaders(profile_picture.hapi.headers);

    const newFilename = await this._storageService.generateFileName(profile_picture.hapi);

    const userId = await this._service.addUser({
      fullname,
      email,
      password,
      profile_picture: newFilename
    });

    await this._storageService.writeFile(profile_picture, newFilename);

    return h.response({
      status: 'success',
      message: 'User has been successfully created',
      data: {
        userId
      }
    }).code(201);
  }
}

module.exports = UsersHandler;
