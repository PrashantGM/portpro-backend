const models = require('../../databases/cassandra');

const User = models.loadSchema('User', {
  fields: {
    id: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    name: {
      type: 'varchar',
      rule: { required: true },
    },
    profilePic: {
      type: 'varchar',
    },
  },
  key: [['id'], 'createdAt'],
  clustering_order: { createdAt: 'asc' },
  // materialized_views: {
  //       view_name1: {
  //           select: ["id","name","profilePic"],
  //           key : [["id"],"created"],
  //       },
  indexes: ['name'],
  options: {
    timestamps: true,
    versions: {
      key: '__v',
    },
  },
});

User.syncDB((err, result) => {
  if (err) {
    console.error('Error syncing User table', err);
  } else {
    console.log('User table synced');
  }
});

module.exports = User;
