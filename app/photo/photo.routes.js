import Router from 'express'
import { admin, auth } from '../middleware/user.middleware.js'
import sizeRouter from './size/size.routes.js'
import typePaperRouter from './type-paper/type-paper.routes.js'

import {
	addPhoto,
	deletePhoto,
	getAllPhoto,
	getPhoto,
	updatePhoto
} from './photo.controller.js'

const router = Router()

router.use('/type-paper', typePaperRouter)
router.use('/size', sizeRouter)

router.route('/').post(auth, admin, addPhoto).get(getAllPhoto)

router
	.route('/:id/')
	.get(getPhoto)
	.put(auth, admin, updatePhoto)
	.delete(auth, admin, deletePhoto)

export default router
