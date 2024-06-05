import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all type paper
// @route GET /api/photo/type-paper/
// @access Public

export const getAllTypePaper = asyncHandler(async (req, res) => {
	const typePaperAll = await prisma.type_paper.findMany({
		orderBy: {
			NAME: 'desc'
		},
		where: { IS_ACTIVE: true }
	})
	if (!typePaperAll) {
		res.status(404)
		throw new Error('Type paper not found')
	}
	res.json(typePaperAll)
})

// @desc Get type paper by id
// @route GET /api/photo/type-paper/:id/
// @access Public

export const getTypePaper = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const typePaper = await prisma.type_paper.findUnique({
		where: {
			ID: id,
			IS_ACTIVE: true
		}
	})
	if (!typePaper) {
		res.status(404)
		throw new Error('Type paper not found')
	}
	res.json(typePaper)
})

// @desc Add type paper
// @route POST /api/photo/type-paper/:id/
// @access Admin

export const addTypePaper = asyncHandler(async (req, res) => {
	const { name } = req.body
	const typePaper = await prisma.type_paper.create({
		data: {
			NAME: name
		}
	})
	if (!typePaper) {
		res.status(404)
		throw new Error('Type paper not found')
	}
	res.json(typePaper)
})

// @desc Update type paper
// @route PUT /api/photo/type-paper/:id/
// @access Admin

export const updateTypePaper = asyncHandler(async (req, res) => {
	try {
		const typePaper = await prisma.type_paper.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(typePaper)
	} catch (error) {
		res.status(404)
		throw new Error('Type paper not found')
	}
})

// @desc Delete type paper
// @route DELETE /api/photo/type-paper/:id/
// @access Admin

export const deleteTypePaper = asyncHandler(async (req, res) => {
	try {
		const typePaper = await prisma.type_paper.delete({
			where: { ID: +req.params.id }
		})

		res.json(typePaper)
	} catch (error) {
		res.status(404)
		throw new Error('Type paper not found')
	}
})
