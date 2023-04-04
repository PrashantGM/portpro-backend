import { Router } from 'express';
import { getUsersFromMongo } from '../controllers/user.controller.js';

const router = Router();

router.route('/v2/user').get(getUsersFromMongo);

export { router };
