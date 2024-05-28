import Router from 'express'

import { admin, auth, buyer } from '../middleware/user.middleware.js'
import statusRouter from './status/status.routes.js'
import typeSpeedOrderRouter from './type-speed-order/type-speed-order.routes.js'

import {
	addOrder,
	changeStatusOrder,
	deleteOrder,
	getAllOrder,
	getOrder
} from './order.controller.js'
const router = Router()

router.use('/status/', statusRouter)
router.use('/type-order-speed/', typeSpeedOrderRouter)

router.route('/').post(auth, buyer, addOrder).get(auth, getAllOrder)

router
	.route('/:id/')
	.get(auth, getOrder)
	.patch(auth, changeStatusOrder)
	.delete(auth, admin, deleteOrder)

export default router
