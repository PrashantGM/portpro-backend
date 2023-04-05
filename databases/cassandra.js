// const models = require('express-cassandra');

// models.setDirectory('../models/cassandra/').bind(
//   {
//     clientOptions: {
//       contactPoints: ['127.0.0.1'],
//       localDataCenter: 'datacenter1',
//       protocolOptions: { port: 9042 },
//       keyspace: 'portpro_keyspace',
//       queryOptions: { consistency: models.consistencies.one },
//       socketOptions: { readTimeout: 60000 },
//     },
//     ormOptions: {
//       defaultReplicationStrategy: {
//         class: 'SimpleStrategy',
//         replication_factor: 1,
//       },
//       migration: 'safe',
//     },
//   },
//   function (err) {
//     if (err) throw err;
//   }
// );

const expressCassandra = require('express-cassandra');

const models = expressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    protocolOptions: { port: 9042 },
    keyspace: 'portpro_keyspace',
    queryOptions: { consistency: expressCassandra.consistencies.one },
    socketOptions: { readTimeout: 60000 },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

module.exports = models;
