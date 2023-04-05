const { Router } = require('express');
const {
  getUsersFromMongo,
  getUsersFromMySQL,
} = require('../controllers/user.controller');

const router = Router();

router.route('/v1/user').get(getUsersFromMySQL);
router.route('/v2/user').get(getUsersFromMongo);

module.exports = router;
