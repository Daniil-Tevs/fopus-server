import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc Get all feedback
// @route GET /api/feedback/
// @access Private

export const getAllFeedback = asyncHandler(async (req, res) => {
	const feedbacks = await prisma.feedback.findMany({
		where: {
			people: {
				ID: req.user.ID
			}
		},
		include: {
			photo_order: true,
			people: {
				select: UserFields
			}
		}
	})

	if (!feedbacks) {
		res.status(404)
		throw new Error('Feedbacks not found')
	}
	res.status(200).json(feedbacks)
})

// @desc Get feedback by id
// @route GET /api/feedback/:id/
// @access Private

export const getFeedback = asyncHandler(async (req, res) => {
	const feedback = await prisma.feedback.findFirst({
		where: {
			ID: +req.params.id,
			people: {
				ID: req.user.ID
			}
		},
		include: {
			photo_order: true,
			people: {
				select: UserFields
			}
		}
	})

	if (!feedback) {
		res.status(404)
		throw new Error('Feedback not found')
	}
	res.status(200).json(feedback)
})

// @desc Add feedback
// @route POST /api/feedback/
// @access Private

export const addFeedback = asyncHandler(async (req, res) => {
	const { text, orderId } = req.body

	console.log(await prisma.feedback)
	const feedback = await prisma.feedback.create({
		data: {
			TEXT: text,
			photo_order: {
				connect: {
					ID: +orderId
				}
			},
			people: {
				connect: {
					ID: req.user.ID
				}
			}
		},
		include: {
			photo_order: true,
			people: {
				select: UserFields
			}
		}
	})

	if (!feedback) {
		res.status(400)
		throw new Error('Failed to create feedback')
	}

	res.status(200).json(feedback)
})

// @desc Change feedback
// @route PATCH /api/feedback/:id/
// @access Private

export const changeFeedback = asyncHandler(async (req, res) => {
	const { text } = req.body

	/** TODO: Сделать проверку на выполненый заказ и отмену */
	try {
		const feedback = await prisma.feedback.update({
			data: {
				TEXT: text
			},
			where: {
				ID: +req.params.id
			},
			include: {
				photo_order: true,
				people: {
					select: UserFields
				}
			}
		})

		if (!feedback) {
			res.status(400)
			throw new Error('feedback not found')
		}
		res.status(200).json(feedback)
	} catch (error) {
		res.status(400)
		throw new Error('Failed to update feedback')
	}
})

// @desc Delete order
// @route DELETE /api/feedback/:id/
// @access Admin

export const deleteFeedback = asyncHandler(async (req, res) => {
	try {
		const feedback = await prisma.feedback.delete({
			where: {
				ID: +req.params.id
			},
			include: {
				photo_order: true,
				people: {
					select: UserFields
				}
			}
		})

		if (!feedback) {
			res.status(400)
			throw new Error('feedback not found')
		}
		res.status(200).json(feedback)
	} catch (error) {
		res.status(400)
		throw new Error('Failed to delete feedback')
	}
})
