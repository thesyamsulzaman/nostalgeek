exports.up = (pgm) => {
  pgm.addColumns('invitations', {
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },

    updated_at: {
      type: 'TEXT',
      notNull: true,
    },

  });
};

exports.down = (pgm) => {
  pgm.dropColumns('invitations', {
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },

    updated_at: {
      type: 'TEXT',
      notNull: true,
    },

  });
};
