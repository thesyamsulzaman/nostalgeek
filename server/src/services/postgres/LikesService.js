/* eslint-disable no-useless-catch */
const { Pool } = require("pg");

const InvariantError = require("../../exceptions/InvariantError");
const { getInvitationDetail } = require("./SharedService");

class LikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLike(invitationId, ownerId) {
    try {
      await this._pool.query("BEGIN");
      const existedLikeObject = await this.getlikeObject(invitationId, ownerId);

      if (!existedLikeObject) {
        const result = await this._pool.query(
          "INSERT INTO likes VALUES ($1, $2)",
          [invitationId, ownerId]
        );

        if (!result.rowCount) {
          throw new InvariantError("Youre not allowed to add like");
        }

        await this._pool.query(
          `          
            UPDATE invitations 
            SET like_count = (
              (
                SELECT COUNT(*)
                FROM likes WHERE 
                invitation_id = $2
              )
            ), updated_at = $1
            WHERE invitations.id = $2
          `,
          [new Date().toISOString(), invitationId]
        );

        await this._pool.query("COMMIT");

        // await this._cacheService.delete(`users:${ownerId}`);
        // await this._cacheService.delete(`invitations:${ownerId}`);
        /// /await this._cacheService.delete('invitations');
        const invitation = await getInvitationDetail(invitationId);
        return invitation;
      } else {
        throw new InvariantError("Invitation has been liked");
      }
    } catch (error) {
      await this._pool.query("ROLLBACK");
      throw error;
    }
  }

  async removeLike(invitationId, ownerId) {
    try {
      const existedLikeObject = await this.getlikeObject(invitationId, ownerId);

      if (existedLikeObject) {
        await this._pool.query("BEGIN");

        const result = await this._pool.query(
          "DELETE FROM likes WHERE invitation_id = $1 AND owner = $2",
          [invitationId, ownerId]
        );

        if (!result.rowCount) {
          throw new InvariantError("Youre not allowed to remove like");
        }

        await this._pool.query(
          `          
            UPDATE invitations 
            SET like_count = (
              (
                SELECT COUNT(*)
                FROM likes WHERE 
                invitation_id = $2
              )
            ), updated_at = $1
            WHERE invitations.id = $2
          `,
          [new Date().toISOString(), invitationId]
        );

        await this._pool.query("COMMIT");

        // await this._cacheService.delete(`users:${ownerId}`);
        // await this._cacheService.delete(`invitations:${ownerId}`);
        /// /await this._cacheService.delete('invitations');

        const invitation = await getInvitationDetail(invitationId);
        return invitation;
      } else {
        throw new InvariantError("Invitation hasnt been liked");
      }
    } catch (error) {
      await this._pool.query("ROLLBACK");
      throw error;
    }
  }

  async getlikeObject(invitationId, ownerId) {
    const query = {
      text: "SELECT * FROM likes WHERE invitation_id = $1 AND owner = $2",
      values: [invitationId, ownerId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = LikesService;
