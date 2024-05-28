import Router from 'express'
import { admin, auth } from '../../middleware/user.middleware.js'
import {
	addStatus,
	deleteStatus,
	getAllStatus,
	getStatus,
	updateStatus
} from './status.controller.js'

const router = Router()

router.route('/').post(auth, admin, addStatus).get(getAllStatus)

router
	.route('/:id/')
	.get(getStatus)
	.put(auth, admin, updateStatus)
	.delete(auth, admin, deleteStatus)

export default router
