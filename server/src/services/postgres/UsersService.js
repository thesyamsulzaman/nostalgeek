const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const InvariantError = require("../../exceptions/InvariantError");
const AuthenticationError = require("../../exceptions/AuthenticationError");
const NotFoundError = require("../../exceptions/NotFoundError");

const {
  mapLikeData,
  mapUserData,
  mapInvitationData,
  mapUserInfoData,
} = require("../../utils/mappers");
const slowRequest = require("../../utils/slowRequestMock");

class UsersService {
  constructor(storageService, cacheService) {
    this._pool = new Pool();
    this._storageService = storageService;
    this._cacheService = cacheService;
  }

  async addUser({ fullname, email, password, profile_picture }) {
    await this.verifyUserByEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePictureName = "default-profile-picture.jpg";

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
      throw new InvariantError("Registration failed, server error");
    }

    return result.rows[0].id;
  }

  async editUserById(
    userId,
    { fullname, email, profile_picture, oldProfilePictureName = null }
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

      if (oldProfilePictureName !== "default-profile-picture.jpg") {
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
      throw new NotFoundError("User is not found");
    }

    return result.rows[0].id;
  }

  async getUserInfo(userId) {
    const userResult = await this._pool.query(
      `
        select 
          users.id as user_id, 
          users.fullname as user_fullname, 
          users.profile_picture as user_profile_picture,
          users.email as user_email,

          likes.invitation_id as like_invitation_id,

          comments.id as comment_id,
          comments.invitation_id as comment_invitation_id,
          comments.body as comment_body,

          invitations.id as invitation_id,
          invitations.image as invitation_image,
          invitations.title as invitation_title,
          invitations.body as invitation_body,
          invitations.like_count as invitations_like_count,
          invitations.comment_count as invitations_comment_count,
          invitations.inserted_at as invitations_inserted_at,
          invitations.updated_at as invitations_updated_at

        from users
        left join invitations on invitations.owner = users.id
        left join likes on likes.owner = users.id
        left join comments on comments.owner = users.id
        where users.id = $1;
      `,
      [userId]
    );

    if (!userResult.rowCount) {
      throw new NotFoundError("User is not found");
    }

    return mapUserInfoData(userResult.rows);
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
      throw new AuthenticationError("Wrong user credentials");
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError("Wrong user credentials");
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
        "Registration fail, email has been used by somebody else"
      );
    }
  }
}

module.exports = UsersService;
