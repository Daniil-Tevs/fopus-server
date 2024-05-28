import Router from 'express'
import { auth, seller } from '../middleware/user.middleware.js'

import {
	addGood,
	deleteGood,
	getAllGoods,
	getGood,
	getGoods,
	updateGood
} from './good.controller.js'

const router = Router()

router.route('/').post(auth, seller, addGood).get(auth, seller, getGoods)

router.route('/all/').get(auth, getAllGoods)

router
	.route('/:id/')
	.get(auth, seller, getGood)
	.put(auth, seller, updateGood)
	.delete(auth, seller, deleteGood)

export default router
