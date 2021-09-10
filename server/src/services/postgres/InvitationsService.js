const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const InvariantError = require('../../exceptions/InvariantError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

const { mapInvitationData } = require('../../utils/mappers');

class InvitationsService {
  constructor(storageService, cacheService) {
    this._pool = new Pool();
    this._storageService = storageService;
    this._cacheService = cacheService;
  }

  async addInvitation({
    title, body, image, owner, likeCount, commentCount
  }) {
    const id = `invitation-${nanoid(16)}`;
    const insertedAt = new Date().toISOString();
    let newImageName = 'default-image.jpg';

    if (image) {
      newImageName = await this._storageService.generateFileName(image.hapi);
      await this._storageService.writeFile(image, newImageName);
    }

    const query = {
      text: `
        INSERT INTO invitations 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING  
          id, title, body, image, owner, 
          like_count, comment_count, inserted_at, updated_at
      `,
      values: [
        id,
        title,
        body,
        newImageName,
        owner,
        likeCount,
        commentCount,
        insertedAt,
        insertedAt,
      ],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Adding invitation failed');
    }

    // //await this._cacheService.delete(`users:${result.rows[0].owner}`);
    // //await this._cacheService.delete('invitations');

    return mapInvitationData(result.rows[0]);
  }

  async getAllInvitations() {
    // try {
    // const results = //await this._cacheService.get('invitations');
    // return JSON.parse(results);
    // } catch (error) {
    const results = await this._pool.query('SELECT * FROM invitations ', []);
    const mappedResults = results.rows.map(mapInvitationData);
    // await this._cacheService.set(
    //   'invitations',
    //   JSON.stringify(mappedResults)
    // );

    return mappedResults;
    // }
  }

  async getInvitationById(invitationId) {
    const invitationQuery = {
      text: 'SELECT * FROM invitations WHERE id = $1',
      values: [invitationId],
    };

    const commentsQuery = {
      text: `
        SELECT id, body FROM comments WHERE invitation_id = $1
      `,
      values: [invitationId],
    };

    const invitationResult = await this._pool.query(invitationQuery);
    const commentsResult = await this._pool.query(commentsQuery);

    if (!invitationResult.rowCount) {
      throw new InvariantError('Invitation not found');
    }

    const invitation = mapInvitationData(invitationResult.rows[0]);
    invitation.comments = commentsResult.rows;

    return invitation;
  }

  async getInvitationsByOwner(owner) {
    const results = await this._pool.query(
      'SELECT * FROM invitations WHERE owner = $1',
      [owner]
    );

    const mappedResults = results.rows.map(mapInvitationData);
    // await this._cacheService.set(
    //   `invitations:${owner}`,
    //   JSON.stringify(mappedResults)
    // );

    return mappedResults;
  }

  async deleteInvitation(invitationId) {
    const query = {
      text: 'DELETE FROM invitations WHERE id = $1 RETURNING id, image, owner',
      values: [invitationId],
    };

    const result = await this._pool.query(query);

    // //await this._cacheService.delete(`users:${result.rows[0].owner}`);
    // //await this._cacheService.delete('invitations');

    if (result.rows[0].image !== 'default-image.jpg') {
      await this._storageService.removeFile(result.rows[0].image);
    }

    if (!result.rowCount) {
      throw new InvariantError(
        'Deleting invitation failed, invitationId not found'
      );
    }
  }

  async editInvitationById(invitationId, {
    title, body, image, oldImageName
  }) {
    let queryText = `
      UPDATE invitations 
      SET title = $1, body = $2, updated_at = $3
      WHERE id = $4
      RETURNING  
        id, title, body, image, owner, 
        like_count, comment_count, inserted_at, updated_at
    `;

    let queryParams = [title, body, new Date().toISOString(), invitationId];

    if (image && oldImageName) {
      queryText = `
        UPDATE invitations 
        SET title = $1, body = $2, image = $3, updated_at = $4
        WHERE id = $5
        RETURNING  
          id, title, body, image, owner, 
          like_count, comment_count, inserted_at, updated_at
      `;

      console.log(oldImageName);

      if (oldImageName !== 'default-image.jpg') {
        await this._storageService.removeFile(oldImageName);
      }

      const newImageName = await this._storageService.generateFileName(
        image.hapi
      );

      await this._storageService.writeFile(image, newImageName);

      queryParams = [
        title,
        body,
        newImageName,
        new Date().toISOString(),
        invitationId,
      ];
    }
    const result = await this._pool.query(queryText, queryParams);

    // //await this._cacheService.delete(`users:${result.rows[0].owner}`);
    // //await this._cacheService.delete('invitations');

    if (!result.rowCount) {
      throw new InvariantError('Updating invitation failed');
    }

    return mapInvitationData(result.rows[0]);
  }

  async verifyInvitationOwner(invitationId, userId) {
    const query = {
      text: 'SELECT * FROM invitations WHERE id = $1',
      values: [invitationId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError(
        'Deleting invitation failed, invitationId not found'
      );
    }

    const { owner: invitationOwnerId } = result.rows[0];

    if (invitationOwnerId !== userId) {
      throw new AuthorizationError('You have no right to access this');
    }
  }
}

module.exports = InvitationsService;
