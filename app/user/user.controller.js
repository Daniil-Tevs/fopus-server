import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

import { UserFields } from '../utils/user.utils.js'
// @desc Get profile
// @route GET /api/user/
// @access Private

export const getProfile = asyncHandler(async (req, res) => {
	res.json(req.user)
})

// @desc Get user list
// @route GET /api/user/
// @access Private

export const getUserList = asyncHandler(async (req, res) => {
	const filters = { IS_ACTIVE: true }
	const filtersSource = req.body.filters

	if (filtersSource) {
		if (filtersSource.roleId) filters.ROLE_ID = +filtersSource.roleId
	}

	const userAll = await prisma.people.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: filters,
		select: UserFields
	})
	if (!userAll) {
		res.status(404)
		throw new Error('User empty')
	}
	res.json(userAll)
})

// @desc Get seller list
// @route GET /api/user/seller
// @access Private

export const getSellerList = asyncHandler(async (req, res) => {
	const sellerAll = await prisma.people.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: {
			ROLE_ID: 2,
			IS_ACTIVE: true
		},
		select: UserFields
	})
	if (!sellerAll) {
		res.status(404)
		throw new Error('Seller list empty')
	}
	res.json(sellerAll)
})
