const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({
    fullname, email, password, profile_picture
  }) {
    await this.verifyByEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `
        INSERT INTO users VALUES ($1, $2, $3, $4, $5) RETURNING id
      `,
      values: [id, fullname, email, hashedPassword, profile_picture]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Registration failed, server error');
    }

    return result.rows[0].id;
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: `
        SELECT id, password FROM users WHERE email = $1
      `,
      values: [email]
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

  async verifyByEmail(email) {
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
