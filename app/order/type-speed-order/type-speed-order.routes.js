import Router from 'express'
import { admin, auth } from '../../middleware/user.middleware.js'
import {
	addTypeOrderSpeed,
	deleteTypeOrderSpeed,
	getAllTypeOrderSpeed,
	getTypeOrderSpeed,
	updateTypeOrderSpeed
} from './type-speed-order.controller.js'

const router = Router()

router.route('/').post(auth, admin, addTypeOrderSpeed).get(getAllTypeOrderSpeed)

router
	.route('/:id/')
	.get(getTypeOrderSpeed)
	.put(auth, admin, updateTypeOrderSpeed)
	.delete(auth, admin, deleteTypeOrderSpeed)

export default router
