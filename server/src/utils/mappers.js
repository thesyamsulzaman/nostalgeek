const mapInvitationData = ({
  id,
  like_count,
  comment_count,
  inserted_at,
  updated_at,
  image,
  fullname,
  profile_picture,
  comments = [],
  ...rest
}) => ({
  id,
  imageUrl: `http://${process.env.HOST}:${process.env.PORT}/invitations/${id}/images/${image}`,
  userProfilePictureUrl: `http://${process.env.HOST}:${process.env.PORT}/users/info/profile-pictures/${profile_picture}`,
  userFullName: fullname,
  ...rest,
  likeCount: like_count,
  commentCount: comment_count,
  insertedAt: inserted_at,
  updatedAt: updated_at,
  comments,
});

const mapLikeData = ({ invitation_id, ...rest }) => ({
  ...rest,
  invitationId: invitation_id,
});

const mapCommentData = ({
  id,
  invitation_id,
  profile_picture,
  fullname,
  ...rest
}) => ({
  ...rest,
  id,
  invitationId: invitation_id,
  fullName: fullname,
  profilePictureUrl: `http://${process.env.HOST}:${process.env.PORT}/users/info/profile-pictures/${profile_picture}`,
});

const mapUserData = ({ profile_picture, fullname, ...rest }) => ({
  ...rest,
  profilePicture: profile_picture,
  fullName: fullname,
  profilePictureUrl: `http://${process.env.HOST}:${process.env.PORT}/users/info/profile-pictures/${profile_picture}`,
});

const mapUserInfoData = (user) => {
  return user.reduce((accumulator, currentItem) => {
    const {
      user_id,
      user_fullname,
      user_profile_picture,
      user_email,

      like_invitation_id,

      comment_id,
      comment_invitation_id,
      comment_body,

      invitation_id,
      invitation_image,
      invitation_title,
      invitation_body,
      invitations_like_count,
      invitations_comment_count,
      invitations_inserted_at,
      invitations_updated_at,
    } = currentItem;

    accumulator.information = {
      ...mapUserData({
        id: user_id,
        fullname: user_fullname,
        profile_picture: user_profile_picture,
        email: user_email,
      }),
    };

    accumulator.invitations = accumulator["invitations"] || [];
    accumulator.invitations.push(
      mapInvitationData({
        id: invitation_id,
        image: invitation_image,
        fullname: user_fullname,
        title: invitation_title,
        body: invitation_body,
        like_count: invitations_like_count,
        comment_count: invitations_comment_count,
        inserted_at: invitations_inserted_at,
        updated_at: invitations_updated_at,
      })
    );

    accumulator.likes = accumulator["likes"] || [];
    accumulator.likes.push(
      mapLikeData({
        invitation_id: like_invitation_id,
        owner: user_id,
      })
    );

    accumulator.comments = accumulator["comments"] || [];
    accumulator.comments.push(
      mapCommentData({
        id: comment_id,
        invitation_id: comment_invitation_id,
        body: comment_body,
        owner: user_id,
        profile_picture: user_profile_picture,
        fullname: user_fullname,
      })
    );

    return accumulator;
  }, {});
};

const mapInvitationDetail = (invitation) =>
  invitation.reduce((finalObj, item) => {
    finalObj = {
      ...(finalObj.hasOwnProperty("id")
        ? finalObj
        : mapInvitationData({
            id: item.id,
            image: item.image,
            profile_picture: item.invitation_owner_profile_picture,
            fullname: item.invitation_owner,
            title: item.title,
            body: item.body,
            like_count: item.like_count,
            comment_count: item.comment_count,
            inserted_at: item.inserted_at,
            updated_at: item.updated_at,
          })),
    };
    finalObj["comments"] = finalObj["comments"] || [];
    item.comment_id &&
      finalObj.comments.push(
        mapCommentData({
          id: item.comment_id,
          invitation_id: item.id,
          profile_picture: item.comment_owner_profile_picture,
          fullname: item.comment_owner,
          owner: item.comment_owner_id,
          body: item.comment_body,
        })
      );
    return finalObj;
  }, {});

module.exports = {
  mapUserData,
  mapInvitationData,
  mapLikeData,
  mapCommentData,
  mapUserInfoData,
  mapInvitationDetail,
};
