import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

export const auth = asyncHandler(async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const userFound = await prisma.people.findUnique({
			where: {
				ID: decoded.userId
			},
			select: UserFields
		})

		if (userFound) {
			req.user = userFound
			next()
		} else {
			res.status(401)
			throw new Error('Not authorization token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorization, do not have a token')
	}
})

export const admin = asyncHandler(async (req, res, next) => {
	const user = req.user
	if (user && user.ROLE_ID === 1) {
		next()
	} else {
		res.status(401)
		throw new Error(`Don't have permission to admin`)
	}
})

export const seller = asyncHandler(async (req, res, next) => {
	const user = req.user
	if (user && user.ROLE_ID === 2) {
		next()
	} else {
		res.status(401)
		throw new Error(`Don't have permission to seller`)
	}
})

export const buyer = asyncHandler(async (req, res, next) => {
	const user = req.user
	if (user && user.ROLE_ID === 3) {
		next()
	} else {
		res.status(401)
		throw new Error(`Don't have permission to buyer`)
	}
})
