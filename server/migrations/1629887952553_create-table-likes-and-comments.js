exports.up = (pgm) => {
  pgm.createTable('comments', {
    id: {
      primaryKey: true,
      type: 'VARCHAR(50)',
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    invitation_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
  });

  pgm.addConstraint('comments', 'comments.owner__users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('comments', 'comments.invitation_id__invitations.id', 'FOREIGN KEY(invitation_id) REFERENCES invitations(id) ON DELETE CASCADE');

  pgm.createTable('likes', {
    invitation_id: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
  });

  pgm.addConstraint('likes', 'likes.owner__users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint('likes', 'likes.invitation_id__invitations.id', 'FOREIGN KEY(invitation_id) REFERENCES invitations(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('comments');
  pgm.dropConstraint('comments', 'comments.owner__users.id');
  pgm.dropConstraint('comments', 'comments.invitation_id__invitations.id');

  pgm.dropTable('likes');
  pgm.dropConstraint('likes', 'likes.owner__users.id');
  pgm.dropConstraint('likes', 'likes.invitation_id__invitations.id');
};
