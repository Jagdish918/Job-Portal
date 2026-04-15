import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notification.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route('/').get(isAuthenticated, getNotifications);
router.route('/:id/read').put(isAuthenticated, markAsRead);

export default router;
