import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all status
// @route GET /api/order/status/
// @access Public

export const getAllStatus = asyncHandler(async (req, res) => {
	const statusAll = await prisma.order_status.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: { IS_ACTIVE: true }
	})
	if (!statusAll) {
		res.status(404)
		throw new Error('Status order not found')
	}
	res.json(statusAll)
})

// @desc Get status by id
// @route GET /api/order/status/:id/
// @access Public

export const getStatus = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const status = await prisma.order_status.findUnique({
		where: {
			ID: id,
			IS_ACTIVE: true
		}
	})
	if (!status) {
		res.status(404)
		throw new Error('Status order not found')
	}
	res.json(status)
})

// @desc Add status
// @route POST /api/order/status/:id/
// @access Admin

export const addStatus = asyncHandler(async (req, res) => {
	const { name } = req.body
	const status = await prisma.order_status.create({
		data: {
			NAME: name
		}
	})
	if (!status) {
		res.status(404)
		throw new Error('Status order not found')
	}
	res.json(status)
})

// @desc Update status
// @route PUT /api/order/status/:id/
// @access Admin

export const updateStatus = asyncHandler(async (req, res) => {
	try {
		const status = await prisma.order_status.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(status)
	} catch (error) {
		res.status(404)
		throw new Error('Status order not found')
	}
})

// @desc Delete status
// @route DELETE /api/order/status/:id/
// @access Admin

export const deleteStatus = asyncHandler(async (req, res) => {
	try {
		const status = await prisma.order_status.delete({
			where: { ID: +req.params.id }
		})

		res.json(status)
	} catch (error) {
		res.status(404)
		throw new Error('Status order not found')
	}
})
