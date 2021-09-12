const mapInvitationData = ({
  id,
  like_count,
  comment_count,
  inserted_at,
  updated_at,
  image,
  fullname,
  profile_picture,
  ...rest
}) => ({
  id,
  image,
  imageUrl: `http://${process.env.HOST}:${process.env.PORT}/invitations/${id}/images/${image}`,
  userProfilePictureUrl: `http://${process.env.HOST}:${process.env.PORT}/users/info/profile-pictures/${profile_picture}`,
  userFullName: fullname,
  likeCount: like_count,
  commentCount: comment_count,
  insertedAt: inserted_at,
  updatedAt: updated_at,
  ...rest,
});

const mapLikeData = ({ invitation_id, ...rest }) => ({
  ...rest,
  invitationId: invitation_id,
});

const mapCommentData = ({ invitation_id, ...rest }) => ({
  ...rest,
  invitationId: invitation_id,
});

const mapUserData = ({ profile_picture, ...rest }) => ({
  ...rest,
  profilePicture: profile_picture,
});

const mapUserInfoData = ({
  information, information: { profilePicture }, likes, invitations, ...rest
}) => ({
  information: {
    ...information,
    profilePictureUrl: `http://${process.env.HOST}:${process.env.PORT}/users/info/profile-pictures/${profilePicture}`
  },
  likes,
  invitations,
  ...rest
});

module.exports = {
  mapUserData,
  mapInvitationData,
  mapLikeData,
  mapCommentData,
  mapUserInfoData
};
