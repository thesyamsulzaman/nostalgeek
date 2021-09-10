exports.up = (pgm) => {
  pgm.createTable('invitations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(100)',
      notNull: true
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    image: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    like_count: {
      type: 'INT',
      notNull: true,
    },
    comment_count: {
      type: 'INT',
      notNull: true
    }
  });

  pgm.addConstraint('invitations', 'invitations.owner__users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('invitations');
  pgm.dropConstraint('invitations', 'invitations.owner__users.id');
};
