const { Pool } = require("pg");
const { nanoid } = require("nanoid");

const InvariantError = require("../../exceptions/InvariantError");
const { getInvitationDetail } = require("./SharedService");
const { mapCommentData } = require("../../utils/mappers");

class CommentsService {
  constructor() {
    this._pool = new Pool();
  }

  async addComment({ body, invitationId, ownerId }) {
    try {
      await this._pool.query("BEGIN");
      const id = `comment-${nanoid(16)}`;

      const query = {
        text: `    
          WITH comment_insertion AS (
            INSERT INTO comments (
              id, 
              body, 
              invitation_id, 
              owner
            ) VALUES (
              $1, $2, $3, $4
            ) RETURNING *
          )
          SELECT 
            users.fullname, 
            users.profile_picture, 
            comment_insertion.* 
          FROM comment_insertion
          JOIN users ON users.id = comment_insertion.owner;
        `,
        values: [id, body, invitationId, ownerId],
      };

      const result = await this._pool.query(query);
      await this._pool.query(
        `
          UPDATE invitations 
          SET comment_count = (
            (
              SELECT COUNT(*)
              FROM comments WHERE 
              invitation_id = $2
            )
          ), updated_at = $1
          WHERE id = $2
        `,
        [new Date().toISOString(), invitationId]
      );

      if (!result.rowCount) {
        throw new InvariantError("Adding comment failed");
      }

      await this._pool.query("COMMIT");

      return mapCommentData(result.rows[0]);
    } catch (error) {
      await this._pool.query("ROLLBACK");
      throw error;
    }
  }

  async deleteComment({ invitationId, ownerId, commentId }) {
    try {
      await this._pool.query("BEGIN");

      const query = {
        text: `
          DELETE FROM comments 
          WHERE id = $1 AND invitation_id = $2 AND owner = $3
          RETURNING comments.*;
        `,
        values: [commentId, invitationId, ownerId],
      };

      const result = await this._pool.query(query);

      if (!result.rowCount) {
        throw new InvariantError("Comment not found");
      }

      await this._pool.query(
        `
          UPDATE invitations 
          SET comment_count = (
            (
              SELECT COUNT(*)
              FROM comments WHERE 
              invitation_id = $2
            )
          ), updated_at = $1
          WHERE id = $2
        `,
        [new Date().toISOString(), invitationId]
      );

      await this._pool.query("COMMIT");

      return mapCommentData(result.rows[0]);
    } catch (error) {
      await this._pool.query("ROLLBACK");
      throw error;
    }
  }
}

module.exports = CommentsService;
