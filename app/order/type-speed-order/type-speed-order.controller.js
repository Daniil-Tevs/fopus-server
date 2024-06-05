import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all typeSpeedOrder
// @route GET /api/order/type-order-speed/
// @access Public

export const getAllTypeOrderSpeed = asyncHandler(async (req, res) => {
	const typeOrderSpeedAll = await prisma.type_speed_order.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: { IS_ACTIVE: true }
	})
	if (!typeOrderSpeedAll) {
		res.status(404)
		throw new Error('Type order speed not found')
	}
	res.json(typeOrderSpeedAll)
})

// @desc Get size by id
// @route GET /api/order/type-order-speed/:id/
// @access Public

export const getTypeOrderSpeed = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const typeSpeedOrder = await prisma.type_speed_order.findUnique({
		where: {
			ID: id,
			IS_ACTIVE: true
		}
	})
	if (!typeSpeedOrder) {
		res.status(404)
		throw new Error('Type order speed not found')
	}
	res.json(typeSpeedOrder)
})

// @desc Add typeSpeedOrder
// @route POST /api/order/type-order-speed/:id/
// @access Admin

export const addTypeOrderSpeed = asyncHandler(async (req, res) => {
	const { name } = req.body
	const typeSpeedOrder = await prisma.type_speed_order.create({
		data: {
			NAME: name
		}
	})
	if (!typeSpeedOrder) {
		res.status(404)
		throw new Error('Type order speed not found')
	}
	res.json(typeSpeedOrder)
})

// @desc Update typeSpeedOrder
// @route PUT /api/order/type-order-speed/:id/
// @access Admin

export const updateTypeOrderSpeed = asyncHandler(async (req, res) => {
	try {
		const typeSpeedOrder = await prisma.type_speed_order.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(typeSpeedOrder)
	} catch (error) {
		res.status(404)
		throw new Error('Type order speed not found')
	}
})

// @desc Delete typeSpeedOrder
// @route DELETE /api/order/type-order-speed/:id/
// @access Admin

export const deleteTypeOrderSpeed = asyncHandler(async (req, res) => {
	try {
		const typeSpeedOrder = await prisma.type_speed_order.delete({
			where: { ID: +req.params.id }
		})

		res.json(typeSpeedOrder)
	} catch (error) {
		res.status(404)
		throw new Error('Type order speed not found')
	}
})
