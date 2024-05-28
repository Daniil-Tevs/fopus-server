import Router from 'express'

import { admin, auth } from '../middleware/user.middleware.js'

import {
	addFeedback,
	changeFeedback,
	deleteFeedback,
	getAllFeedback,
	getFeedback
} from './feedback.controller.js'
const router = Router()

router.route('/').post(auth, addFeedback).get(auth, getAllFeedback)

router
	.route('/:id/')
	.get(auth, getFeedback)
	.patch(auth, changeFeedback)
	.delete(auth, admin, deleteFeedback)

export default router
