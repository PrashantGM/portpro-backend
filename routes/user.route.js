import { Router } from 'express';
import {
  createUsersToMongo,
  getUsersFromMongo,
} from '../controllers/user.controller.js';

const router = Router();

router.route('/v2/user').post(createUsersToMongo).get(getUsersFromMongo);

export { router };
