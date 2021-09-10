exports.up = (pgm) => {
  pgm.renameColumn('users', 'profile_image', 'profile_picture');
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
