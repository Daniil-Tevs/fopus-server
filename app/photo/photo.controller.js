import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all photo
// @route GET /api/photo/
// @access Public

export const getAllPhoto = asyncHandler(async (req, res) => {
	const photoAll = await prisma.photo.findMany({
		orderBy: {
			NAME: 'desc'
		},

		include: {
			type_paper: true,
			photo_size: true
		},

		where: {
			IS_ACTIVE: true
		}
	})
	if (!photoAll) {
		res.status(404)
		throw new Error('Photo not found')
	}
	res.json(photoAll)
})

// @desc Get photo by id
// @route GET /api/photo/:id/
// @access Public

export const getPhoto = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const photo = await prisma.photo.findUnique({
		where: {
			ID: id,
			IS_ACTIVE: true
		},
		include: {
			type_paper: true,
			photo_size: true
		}
	})
	if (!photo) {
		res.status(404)
		throw new Error('Photo not found')
	}
	res.json(photo)
})

// @desc Add photo
// @route POST /api/photo/
// @access Admin

export const addPhoto = asyncHandler(async (req, res) => {
	const { name, typePaperId, sizeId } = req.body
	const photo = await prisma.photo.create({
		data: {
			NAME: name,
			type_paper: {
				connect: {
					ID: +typePaperId
				}
			},
			photo_size: {
				connect: {
					ID: +sizeId
				}
			}
		},
		include: {
			type_paper: true,
			photo_size: true
		}
	})
	if (!photo) {
		res.status(404)
		throw new Error('Photo not created')
	}
	res.json(photo)
})

// @desc Update photo
// @route PUT /api/photo/:id/
// @access Admin

export const updatePhoto = asyncHandler(async (req, res) => {
	const { name, typePaperId, sizeId } = req.body
	const data = {}

	if (name) {
		data.NAME = name
	}
	if (typePaperId) {
		data.type_paper = {
			connect: {
				ID: +typePaperId
			}
		}
	}
	if (sizeId) {
		data.photo_size = {
			connect: {
				ID: +sizeId
			}
		}
	}

	try {
		const photo = await prisma.photo.update({
			data: data,
			where: { ID: +req.params.id },
			include: {
				type_paper: true,
				photo_size: true
			}
		})
		res.json(photo)
	} catch (error) {
		res.status(404)
		throw new Error('Photo not upload')
	}
})

// @desc Delete photo
// @route DELETE /api/photo/:id/
// @access Admin

export const deletePhoto = asyncHandler(async (req, res) => {
	try {
		const photo = await prisma.photo.update({
			where: { ID: +req.params.id },
			data: {
				IS_ACTIVE: 0
			},
			include: {
				type_paper: true,
				photo_size: true
			}
		})

		res.json(photo)
	} catch (error) {
		res.status(404)
		throw new Error('Photo not deleted')
	}
})
