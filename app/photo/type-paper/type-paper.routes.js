import Router from 'express'
import { admin, auth } from '../../middleware/user.middleware.js'
import {
	addTypePaper,
	deleteTypePaper,
	getAllTypePaper,
	getTypePaper,
	updateTypePaper
} from './type-paper.controller.js'

const router = Router()

router.route('/').post(auth, admin, addTypePaper).get(getAllTypePaper)

router
	.route('/:id/')
	.get(getTypePaper)
	.put(auth, admin, updateTypePaper)
	.delete(auth, admin, deleteTypePaper)

export default router
