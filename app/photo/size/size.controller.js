import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all size
// @route GET /api/photo/size/
// @access Public

export const getAllSize = asyncHandler(async (req, res) => {
	const sizeAll = await prisma.photo_size.findMany({
		orderBy: {
			NAME: 'desc'
		}
	})
	if (!sizeAll) {
		res.status(404)
		throw new Error('Photo size not found')
	}
	res.json(sizeAll)
})

// @desc Get size by id
// @route GET /api/photo/size/:id/
// @access Public

export const getSize = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const size = await prisma.photo_size.findUnique({
		where: {
			ID: id
		}
	})
	if (!size) {
		res.status(404)
		throw new Error('Photo size not found')
	}
	res.json(size)
})

// @desc Add size
// @route POST /api/photo/size/:id/
// @access Admin

export const addSize = asyncHandler(async (req, res) => {
	const { name } = req.body
	const size = await prisma.photo_size.create({
		data: {
			NAME: name
		}
	})
	if (!size) {
		res.status(404)
		throw new Error('Photo size not found')
	}
	res.json(size)
})

// @desc Update size
// @route PUT /api/photo/size/:id/
// @access Admin

export const updateSize = asyncHandler(async (req, res) => {
	try {
		const size = await prisma.photo_size.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(size)
	} catch (error) {
		res.status(404)
		throw new Error('Photo size not found')
	}
})

// @desc Delete size
// @route DELETE /api/photo/size/:id/
// @access Admin

export const deleteSize = asyncHandler(async (req, res) => {
	try {
		const size = await prisma.photo_size.delete({
			where: { ID: +req.params.id }
		})

		res.json(size)
	} catch (error) {
		res.status(404)
		throw new Error('Photo size not found')
	}
})
