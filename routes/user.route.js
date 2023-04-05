const { Router } = require('express');
const {
  getUsersFromMongo,
  getUsersFromMySQL,
  getUsersFromCassandra,
} = require('../controllers/user.controller');

const router = Router();

router.route('/v1/user').get(getUsersFromMySQL);
router.route('/v2/user').get(getUsersFromMongo);
router.route('/v3/user').get(getUsersFromCassandra);

module.exports = router;
