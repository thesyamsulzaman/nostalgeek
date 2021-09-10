const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');

class CommentsService {
  constructor() {
    this._pool = new Pool();
  }

  async addComment({ body, invitationId, ownerId }) {
    try {
      await this._pool.query('BEGIN');

      const id = `comment-${nanoid(16)}`;
      let previousCommentCount = await this.getPreviousCommentCount(invitationId);

      const query = {
        text: 'INSERT INTO comments VALUES ($1, $2, $3, $4) RETURNING id',
        values: [id, body, invitationId, ownerId]
      };

      const result = await this._pool.query(query);

      await this._pool.query(
        'UPDATE invitations SET comment_count = $1 WHERE id = $2',
        [previousCommentCount += 1, invitationId]
      );

      if (!result.rowCount) {
        throw new InvariantError('Adding comment failed');
      }

      await this._pool.query('COMMIT');

      return result.rows[0].id;
    } catch (error) {
      await this._pool.query('ROLLBACK');
      throw error;
    }
  }

  async deleteComment(invitationId, ownerId) {
    try {
      await this._pool.query('BEGIN');

      let previousCommentCount = await this.getPreviousCommentCount(invitationId);

      const query = {
        text: 'DELETE FROM comments WHERE invitation_id = $1 AND owner = $2',
        values: [invitationId, ownerId]
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new InvariantError('Comment not found');
      }

      await this._pool.query(
        'UPDATE invitations SET comment_count = $1 WHERE id = $2',
        [previousCommentCount -= 1, invitationId]
      );

      await this._pool.query('COMMIT');
    } catch (error) {
      await this._pool.query('ROLLBACK');
      throw error;
    }
  }

  async getPreviousCommentCount(invitationId) {
    const query = {
      text: 'SELECT comment_count FROM invitations WHERE id = $1',
      values: [invitationId]
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Invitation not found');
    }

    return result.rows[0].comment_count;
  }
}

module.exports = CommentsService;
