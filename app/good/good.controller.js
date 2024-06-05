import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'

// @desc Get all good
// @route GET /api/good/
// @access Private

export const getGoods = asyncHandler(async (req, res) => {
	const goods = await prisma.photo_cost.findMany({
		where: {
			people: {
				ID: +req.user.ID
			},
			IS_ACTIVE: true
		},
		include: {
			photo: {
				include: {
					type_paper: true,
					photo_size: true
				}
			},
			people: {
				select: UserFields
			}
		}
	})

	if (!goods) {
		res.status(404)
		throw new Error('Goods not found')
	}
	res.status(200).json(goods)
})

// @desc Get all good all seller
// @route GET /api/good/all/
// @access Private

export const getAllGoods = asyncHandler(async (req, res) => {
	const filters = {
		IS_ACTIVE: true
	}
	let filtersSource = req.body.filters

	if (!filtersSource || Object.keys(filtersSource).length === 0)
		filtersSource = req.query.filters

	console.log(filtersSource)
	if (filtersSource) {
		if (filtersSource.seller) filters.SELLER_ID = +filtersSource.seller

		if (!!filtersSource.typePaper || !!filtersSource.photoSize)
			filters.photo = {}

		if (!!filtersSource.typePaper)
			filters.photo.TYPE_PAPER_ID = +filtersSource.typePaper

		if (!!filtersSource.photoSize)
			filters.photo.PHOTO_SIZE_ID = +filtersSource.photoSize
	}

	const goods = await prisma.photo_cost.findMany({
		where: filters,
		include: {
			photo: {
				include: {
					type_paper: true,
					photo_size: true
				}
			},
			people: {
				select: UserFields
			}
		}
	})

	if (!goods) {
		res.status(404)
		throw new Error('Goods not found')
	}
	res.status(200).json(goods)
})

// @desc Get good by id
// @route GET /api/good/:id/
// @access Private

export const getGood = asyncHandler(async (req, res) => {
	const good = await prisma.photo_cost.findFirst({
		where: {
			ID: +req.params.id,
			people: {
				ID: +req.user.ID
			},
			IS_ACTIVE: true
		},
		include: {
			photo: {
				photo_cost: true,
				type_paper: true
			},
			people: {
				select: UserFields
			}
		}
	})

	if (!good) {
		res.status(404)
		throw new Error('Good not found')
	}
	res.status(200).json(good)
})

// @desc Add good
// @route POST /api/good/add
// @access Private

export const addGood = asyncHandler(async (req, res) => {
	const { cost, photoId } = req.body

	const good = await prisma.photo_cost.create({
		data: {
			COST: +cost,
			photo: {
				connect: {
					ID: +photoId
				}
			},
			people: {
				connect: {
					ID: +req.user.ID
				}
			}
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
		throw new Error('Failed to add good')
	}
	res.status(200).json(good)
})

// @desc Update good
// @route PUT /api/good/:id/
// @access Private

export const updateGood = asyncHandler(async (req, res) => {
	const { cost } = req.body

	const good = await prisma.photo_cost.update({
		data: {
			COST: +cost
		},
		where: {
			ID: +req.params.id,
			people: {
				ID: +req.user.ID
			}
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
		throw new Error('Failed to update good')
	}
	res.status(200).json(good)
})

// @desc Delete good
// @route DELETE /api/good/:id/
// @access Private

export const deleteGood = asyncHandler(async (req, res) => {
	const good = await prisma.photo_cost.update({
		where: {
			ID: +req.params.id,
			people: {
				ID: +req.user.ID
			}
		},
		data: {
			IS_ACTIVE: 0
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
		throw new Error('Failed to delete good')
	}
	res.status(200).json(good)
})
