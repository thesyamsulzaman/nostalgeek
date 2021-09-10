/* eslint-disable no-useless-catch */
const { Pool } = require('pg');

const InvariantError = require('../../exceptions/InvariantError');

const { mapInvitationData } = require('../../utils/mappers');

class LikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLike(invitationId, ownerId) {
    try {
      const existedLikeObject = await this.getlikeObject(invitationId, ownerId);

      if (!existedLikeObject) {
        await this._pool.query('BEGIN');

        let previousLikeCount = await this.getPreviousLikeCount(invitationId);

        const result = await this._pool.query(
          'INSERT INTO likes VALUES ($1, $2)',
          [invitationId, ownerId]
        );

        if (!result.rowCount) {
          throw new InvariantError('Youre not allowed to add like');
        }

        const invitation = await this._pool.query(
          `
            UPDATE invitations 
            SET like_count = $1, updated_at = $2 
            WHERE id = $3
            RETURNING 
              id, title, body, image, owner, 
              like_count, comment_count, inserted_at, updated_at
          `,
          [(previousLikeCount += 1), new Date().toISOString(), invitationId]
        );
        await this._pool.query('COMMIT');

        //await this._cacheService.delete(`users:${ownerId}`);
        //await this._cacheService.delete(`invitations:${ownerId}`);
        ////await this._cacheService.delete('invitations');

        return mapInvitationData(invitation.rows[0]);
      } else {
        throw new InvariantError('Invitation has been liked');
      }
    } catch (error) {
      await this._pool.query('ROLLBACK');
      throw error;
    }
  }

  async removeLike(invitationId, ownerId) {
    try {
      const existedLikeObject = await this.getlikeObject(invitationId, ownerId);

      if (existedLikeObject) {
        await this._pool.query('BEGIN');

        let previousLikeCount = await this.getPreviousLikeCount(invitationId);

        const result = await this._pool.query(
          'DELETE FROM likes WHERE invitation_id = $1 AND owner = $2',
          [invitationId, ownerId]
        );

        if (!result.rowCount) {
          throw new InvariantError('Youre not allowed to remove like');
        }

        const invitation = await this._pool.query(
          `
            UPDATE invitations 
            SET like_count = $1, updated_at = $2 
            WHERE id = $3
            RETURNING 
              id, title, body, image, owner, 
              like_count, comment_count, inserted_at, updated_at
          `,
          [(previousLikeCount -= 1), new Date().toISOString(), invitationId]
        );

        await this._pool.query('COMMIT');

        //await this._cacheService.delete(`users:${ownerId}`);
        //await this._cacheService.delete(`invitations:${ownerId}`);
        ////await this._cacheService.delete('invitations');

        return mapInvitationData(invitation.rows[0]);
      } else {
        throw new InvariantError('Invitation hasnt been liked');
      }
    } catch (error) {
      await this._pool.query('ROLLBACK');
      throw error;
    }
  }

  async getlikeObject(invitationId, ownerId) {
    const query = {
      text: 'SELECT * FROM likes WHERE invitation_id = $1 AND owner = $2',
      values: [invitationId, ownerId],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPreviousLikeCount(invitationId) {
    const query = {
      text: 'SELECT like_count FROM invitations WHERE id = $1',
      values: [invitationId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Invitation not found');
    }

    return result.rows[0].like_count;
  }
}

module.exports = LikesService;
