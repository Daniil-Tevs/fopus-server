import Router from 'express'
import { admin, auth } from '../middleware/user.middleware.js'

import { getProfile, getSellerList, getUserList } from './user.controller.js'

import roleRouter from './role/role.routes.js'

const router = Router()

router.use('/role/', roleRouter)

router.route('/').get(auth, getProfile)
router.route('/list').get(auth, admin, getUserList)
router.route('/seller').get(auth, getSellerList)

export default router
