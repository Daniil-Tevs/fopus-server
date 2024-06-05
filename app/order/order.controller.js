import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields, switchOrderConditional } from '../utils/user.utils.js'

// @desc Get all order
// @route GET /api/order/
// @access Private

export const getAllOrder = asyncHandler(async (req, res) => {
	const orders = await prisma.photo_order.findMany({
		where: {
			...switchOrderConditional(+req.user.ROLE_ID, +req.user.ID),
			IS_ACTIVE: true
		},
		include: {
			order_status: true,
			photo: true,
			type_speed_order: true,
			people_photo_order_BUYER_IDTopeople: {
				select: UserFields
			},
			people_photo_order_SELLER_IDTopeople: {
				select: UserFields
			}
		}
	})

	if (!orders) {
		res.status(404)
		throw new Error('Orders not found')
	}
	res.status(200).json(orders)
})

// @desc Get order by id
// @route GET /api/order/:id/
// @access Private

export const getOrder = asyncHandler(async (req, res) => {
	const order = await prisma.photo_order.findMany({
		where: {
			ID: +req.params.id,
			...switchOrderConditional(+req.user.ID),
			IS_ACTIVE: true
		},
		include: {
			order_status: true,
			photo: true,
			type_speed_order: true,
			people_photo_order_BUYER_IDTopeople: {
				select: UserFields
			},
			people_photo_order_SELLER_IDTopeople: {
				select: UserFields
			}
		}
	})

	if (!order) {
		res.status(404)
		throw new Error('Order not found')
	}
	res.status(200).json(order)
})

// @desc Add order
// @route POST /api/order/
// @access Private Buyer

export const addOrder = asyncHandler(async (req, res) => {
	try {
		const { amount, goodId, typeSpeedOrderId, date } = req.body
		console.log(amount, goodId, typeSpeedOrderId)
		const good = await prisma.photo_cost.findFirst({
			where: {
				ID: +goodId
			},
			include: {
				photo: true,
				people: {
					select: UserFields
				}
			}
		})

		if (!good) {
			res.status(400)
			throw new Error('Failed to find good')
		}

		const order = await prisma.photo_order.create({
			data: {
				AMOUNT_PHOTO: +amount,
				COST: +amount * +good.COST,
				DATA_CREATED: new Date(date).toISOString(),
				people_photo_order_BUYER_IDTopeople: {
					connect: {
						ID: +req.user.ID
					}
				},
				people_photo_order_SELLER_IDTopeople: {
					connect: {
						ID: +good.people.ID
					}
				},
				photo: {
					connect: {
						ID: +good.photo.ID
					}
				},
				type_speed_order: {
					connect: {
						ID: +typeSpeedOrderId
					}
				}
			},
			include: {
				order_status: true,
				photo: true,
				type_speed_order: true,
				people_photo_order_BUYER_IDTopeople: {
					select: UserFields
				},
				people_photo_order_SELLER_IDTopeople: {
					select: UserFields
				}
			}
		})

		if (!order) {
			res.status(400)
			throw new Error('Failed to add order')
		}
		res.status(200).json(order)
	} catch (error) {
		res.status(400)
		throw new Error(error)
	}
})

// @desc Change status
// @route PATCH /api/user/buyer/order/:id/
// @access Private

export const changeStatusOrder = asyncHandler(async (req, res) => {
	const { statusId } = req.body

	/** TODO: Сделать проверку на выполненый заказ и отмену */
	try {
		const order = await prisma.photo_order.update({
			data: {
				order_status: {
					connect: { ID: +statusId }
				}
			},
			where: {
				ID: +req.params.id
			},
			include: {
				order_status: true,
				photo: true,
				type_speed_order: true,
				people_photo_order_BUYER_IDTopeople: {
					select: UserFields
				},
				people_photo_order_SELLER_IDTopeople: {
					select: UserFields
				}
			}
		})
		if (!order) {
			res.status(400)
			throw new Error('Failed to update order')
		}
		res.status(200).json(order)
	} catch (error) {
		res.status(400)
		throw new Error('Failed to update order')
	}
})

// @desc Delete order
// @route DELETE /api/user/buyer/order/:id/
// @access Admin

export const deleteOrder = asyncHandler(async (req, res) => {
	const order = await prisma.photo_order.delete({
		where: {
			ID: +req.params.id
		},
		include: {
			order_status: true,
			photo: true,
			type_speed_order: true,
			people_photo_order_BUYER_IDTopeople: {
				select: UserFields
			},
			people_photo_order_SELLER_IDTopeople: {
				select: UserFields
			}
		}
	})

	if (!order) {
		res.status(400)
		throw new Error('Failed to delete order')
	}
	res.status(200).json(order)
})
