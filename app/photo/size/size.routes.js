import Router from 'express'
import { admin, auth } from '../../middleware/user.middleware.js'
import {
	addSize,
	deleteSize,
	getAllSize,
	getSize,
	updateSize
} from './size.controller.js'

const router = Router()

router.route('/').post(auth, admin, addSize).get(getAllSize)

router
	.route('/:id/')
	.get(getSize)
	.put(auth, admin, updateSize)
	.delete(auth, admin, deleteSize)

export default router
