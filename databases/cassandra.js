const expressCassandra = require('express-cassandra');

const {
  HOST,
  DATACENTER,
  KEYSPACE,
  REPLICATION_STRATEGY,
  REPLICATION_FACTOR,
  MIGRATION,
} = process.env;

const models = expressCassandra.createClient({
  clientOptions: {
    contactPoints: [HOST],
    localDataCenter: DATACENTER,
    protocolOptions: { port: 9042 },
    keyspace: KEYSPACE,
    queryOptions: { consistency: expressCassandra.consistencies.one },
    socketOptions: { readTimeout: 60000 },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: REPLICATION_STRATEGY,
      replication_factor: REPLICATION_FACTOR,
    },
    migration: MIGRATION,
  },
});

module.exports = models;
