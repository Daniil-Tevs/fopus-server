import Router from 'express'
import { admin, auth } from '../middleware/user.middleware.js'

import {
	addTableData,
	deleteTableData,
	editTableData,
	getTableData,
	getTableField,
	getTables
} from './admin.controller.js'

const router = Router()

router.route('/table/all').get(auth, admin, getTables)
router.route('/table/f/:table').get(auth, admin, getTableField)
router.route('/table/d/:table').get(auth, admin, getTableData)
router.route('/table/:table/add').post(auth, admin, addTableData)
router
	.route('/table/:table/:id')
	.put(auth, admin, editTableData)
	.delete(auth, admin, deleteTableData)

export default router
