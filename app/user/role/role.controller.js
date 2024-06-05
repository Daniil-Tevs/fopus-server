import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all role
// @route GET /api/user/role/
// @access Public

export const getAllRole = asyncHandler(async (req, res) => {
	const roleAll = await prisma.role.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: { IS_ACTIVE: true }
	})
	if (!roleAll) {
		res.status(404)
		throw new Error('Role not found')
	}
	res.json(roleAll)
})

// @desc Get role by id
// @route GET /api/user/role/:id/
// @access Public

export const getRole = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const role = await prisma.role.findUnique({
		where: {
			ID: id,
			IS_ACTIVE: true
		}
	})
	if (!role) {
		res.status(404)
		throw new Error('Role not found')
	}
	res.json(role)
})

// @desc Add role
// @route POST /api/user/role/:id/
// @access Admin

export const addRole = asyncHandler(async (req, res) => {
	const { name } = req.body
	const role = await prisma.role.create({
		data: {
			NAME: name
		}
	})
	if (!role) {
		res.status(404)
		throw new Error('Role not found')
	}
	res.json(role)
})

// @desc Update role
// @route PUT /api/user/role/:id/
// @access Admin

export const updateRole = asyncHandler(async (req, res) => {
	try {
		const role = await prisma.role.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(role)
	} catch (error) {
		res.status(404)
		throw new Error('Role not found')
	}
})

// @desc Delete role
// @route DELETE /api/user/role/:id/
// @access Admin

export const deleteRole = asyncHandler(async (req, res) => {
	try {
		if (+req.params.id === 1) {
			res.status(404)
			throw new Error('Role admin can\t be deleted')
		}

		const role = await prisma.role.delete({
			where: { ID: +req.params.id }
		})

		res.json(role)
	} catch (error) {
		res.status(404)
		throw new Error('Role not found')
	}
})
