import Router from 'express'
import { admin, auth } from '../../middleware/user.middleware.js'
import {
	addRole,
	deleteRole,
	getAllRole,
	getRole,
	updateRole
} from './role.controller.js'

const router = Router()

router.route('/').post(auth, admin, addRole).get(getAllRole)

router
	.route('/:id/')
	.get(getRole)
	.put(auth, admin, updateRole)
	.delete(auth, admin, deleteRole)

export default router
