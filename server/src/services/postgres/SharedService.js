const { Pool } = require("pg");
const InvariantError = require("../../exceptions/InvariantError");
const { mapCommentData, mapInvitationDetail } = require("../../utils/mappers");

const _pool = new Pool();

exports.getCommentObjects = async (invitationId) => {
  const query = {
    text: `
      SELECT 
        users.profile_picture, 
        users.fullname, 
        comments.* 
      FROM comments 
      JOIN users ON users.id = comments.owner
      WHERE comments.invitation_id = $1;
    `,
    values: [invitationId],
  };

  const result = await _pool.query(query);

  return result.rows.map(mapCommentData);
};

exports.getInvitationDetail = async (invitationId) => {
  const query = {
    text: `
      select 
        invitation_owners.profile_picture as invitation_owner_profile_picture,
        invitation_owners.fullname as invitation_owner,
        invitations.*,
        comments.id as comment_id,
        comment_owners.profile_picture as comment_owner_profile_picture,
        comment_owners.id as comment_owner_id,
        comment_owners.fullname as comment_owner,
        comments.body as comment_body
      from invitations
      join users as invitation_owners on invitations.owner = invitation_owners.id
      left join comments on comments.invitation_id  = invitations.id
      left join users as comment_owners on comment_owners.id = comments.owner
      where invitations.id = $1
    `,
    values: [invitationId],
  };

  const invitation = await _pool.query(query);

  if (!invitation.rowCount) {
    throw new InvariantError("Invitation not found");
  }
  return mapInvitationDetail(invitation.rows);
};

exports.getPreviousInvitationInstance = async (invitationId, columnName) => {
  const query = {
    text: `SELECT ${columnName} FROM invitations WHERE id = $1`,
    values: [invitationId],
  };

  const result = await _pool.query(query);
  if (!result.rowCount) {
    throw new InvariantError("Invitation not found");
  }

  return result.rows[0][columnName];
};

module.exports = exports;
