const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const NotFoundError = require('../../exceptions/NotFoundError');

const {
  mapLikeData,
  mapUserData,
  mapInvitationData,
  mapUserInfoData,
} = require('../../utils/mappers');

class UsersService {
  constructor(storageService, cacheService) {
    this._pool = new Pool();
    this._storageService = storageService;
    this._cacheService = cacheService;
  }

  async addUser({
    fullname, email, password, profile_picture
  }) {
    await this.verifyUserByEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePictureName = 'default-profile-picture.jpg';

    if (profile_picture) {
      profilePictureName = await this._storageService.generateFileName(
        profile_picture.hapi
      );
      await this._storageService.writeFile(profile_picture, profilePictureName);
    }

    const query = {
      text: `
        INSERT INTO users 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, fullname, email, profile_picture
      `,
      values: [id, fullname, email, hashedPassword, profilePictureName],
    };

    const result = await this._pool.query(query);

    // await this._cacheService.delete(`users:${id}`);

    if (!result.rowCount) {
      throw new InvariantError('Registration failed, server error');
    }

    return result.rows[0].id;
  }

  async editUserById(
    userId,
    {
      fullname, email, profile_picture, oldProfilePictureName = null
    }
  ) {
    let queryText = `
      UPDATE users 
      SET fullname = $1, email = $2
      WHERE id = $3 
      RETURNING id
    `;

    let queryParams = [fullname, email, userId];

    if (profile_picture && oldProfilePictureName) {
      queryText = `
        UPDATE users 
        SET fullname = $1, email = $2, profile_picture = $3
        WHERE id = $4
        RETURNING id
      `;

      const newProfilePictureName = await this._storageService.generateFileName(
        profile_picture.hapi
      );

      if (oldProfilePictureName !== 'default-profile-picture.jpg') {
        await this._storageService.removeFile(oldProfilePictureName);
      }

      await this._storageService.writeFile(
        profile_picture,
        newProfilePictureName
      );
      queryParams = [fullname, email, newProfilePictureName, userId];
    }

    const result = await this._pool.query(queryText, queryParams);

    // await this._cacheService.delete(`users:${userId}`);

    if (!result.rowCount) {
      throw new NotFoundError('User is not found');
    }

    return result.rows[0].id;
  }

  async getUserInfo(userId) {
    // try {
    //   const result = //await this._cacheService.get(`users:${userId}`);
    //   return JSON.parse(result);
    // } catch (error) {
    const userResult = await this._pool.query(
      'SELECT id, fullname, email, profile_picture FROM users WHERE id = $1',
      [userId]
    );

    const likesResult = await this._pool.query(
      'SELECT * FROM likes WHERE owner = $1',
      [userId]
    );

    const invitationsResult = await this._pool.query(
      'SELECT * FROM invitations WHERE owner = $1',
      [userId]
    );

    if (!userResult.rowCount) {
      throw new NotFoundError('User is not found');
    }

    const user = {
      information: mapUserData(userResult.rows[0]),
      likes: likesResult.rows.map(mapLikeData),
      invitations: invitationsResult.rows.map(mapInvitationData),
    };

    // //await this._cacheService.set(`users:${userId}`, JSON.stringify(user));

    return mapUserInfoData(user);
    // }
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: `
        SELECT id, password FROM users WHERE email = $1
      `,
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Wrong user credentials');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Wrong user credentials');
    }

    return id;
  }

  async verifyUserByEmail(email) {
    const query = {
      text: `
        SELECT * FROM users WHERE email = $1
      `,
      values: [email],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError(
        'Registration fail, email has been used by somebody else'
      );
    }
  }
}

module.exports = UsersService;
