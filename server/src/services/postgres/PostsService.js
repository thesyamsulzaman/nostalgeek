const { Pool } = require('pg');

class PostsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPost() {}

  async deletePost() {}
}
