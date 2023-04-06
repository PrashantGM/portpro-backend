const models = require('../../databases/cassandra');
const { insertToCassandra } = require('../../utils/loadUserData');

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
  indexes: ['name'],
  options: {
    timestamps: true,
    versions: {
      key: '__v',
    },
  },
});

User.syncDB(async (err, result) => {
  if (err) {
    console.error('Error syncing User table', err);
  } else {
    let users = await User.findAsync({});
    if (users.length < 1) {
      await insertToCassandra(models, User);
    }
    console.log('User table synced');
  }
});

module.exports = User;
