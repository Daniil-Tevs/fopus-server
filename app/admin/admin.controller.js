import { hash } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all tables
// @route POST /api/admin/table/all
// @access Private Admin

export const getTables = asyncHandler(async (req, res) => {
	const tableList = []
	Object.keys(prisma).forEach(key => {
		if (!key.startsWith('$') && !key.startsWith('_')) tableList.push(key)
	})

	res.json(tableList)
})

// @desc Get table field
// @route POST /api/admin/table/f/:table
// @access Private Admin

export const getTableField = asyncHandler(async (req, res) => {
	const table = req.params.table

	if (prisma[table]) res.json(prisma[table].fields)

	res.status(404)
	throw new Error('Таблица не найдена')
})

// @desc Get table data
// @route POST /api/admin/table/d/:table
// @access Private Admin

export const getTableData = asyncHandler(async (req, res) => {
	const table = req.params.table

	if (prisma[table]) {
		const data = await prisma[table].findMany({
			orderBy: {
				ID: 'asc'
			},
			where: { IS_ACTIVE: true }
		})

		res.json(data)
	}

	res.status(404)
	throw new Error('Таблица не найдена')
})

// @desc Add table data
// @route POST /api/admin/table/:table
// @access Private Admin

export const addTableData = asyncHandler(async (req, res) => {
	const table = req.params.table
	const params = req.body
	console.log(params)

	if (params.PASSWORD) params.PASSWORD = await hash(params.PASSWORD)

	const dateFormatArr = ['DATA', 'DATE']
	const numberFormatArr = ['COST', 'ID']

	Object.keys(params).forEach(key => {
		dateFormatArr.map(dS => {
			if (key.includes(dS)) params[key] = new Date(params[key]).toISOString()
		})

		numberFormatArr.map(nS => {
			if (key.includes(nS)) params[key] = +params[key]
		})
	})

	if (prisma[table]) {
		try {
			const data = await prisma[table].create({
				data: params
			})
			if (!data) {
				res.status(404)
				throw new Error(
					'Введенных данных есть одна из этих ошибок - неверный формат даты (должен быть гггг-мм-дд), дублирующаяся строка или же другие технические причины. Свяжитесь с поддержкой'
				)
			}
			res.json(data)
		} catch (error) {
			res.status(404)
			throw new Error(error)
		}
	}
	res.status(404)
	throw new Error('Данной сущности нет в базе данных')
})

// @desc Update all data of table
// @route Put /api/admin/table/:table/:id
// @access Admin

export const editTableData = asyncHandler(async (req, res) => {
	const table = req.params.table
	const params = req.body
	const id = +req.params.id

	if (params.PASSWORD) params.PASSWORD = await hash(params.PASSWORD)

	const dateFormatArr = ['DATA', 'DATE']
	const numberFormatArr = ['COST', 'ID']

	Object.keys(params).forEach(key => {
		dateFormatArr.map(dS => {
			if (key.includes(dS)) params[key] = new Date(params[key]).toISOString()
		})

		numberFormatArr.map(nS => {
			if (key.includes(nS)) params[key] = +params[key]
		})
	})

	if (prisma[table]) {
		const data = await prisma[table].update({
			data: params,
			where: {
				ID: id
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})

// @desc delete  data from table
// @route Delete /api/admin/table/:table/:id
// @access Admin

export const deleteTableData = asyncHandler(async (req, res) => {
	const table = req.params.table
	const id = +req.params.id

	if (prisma[table]) {
		const data = await prisma[table].update({
			data: { IS_ACTIVE: false },
			where: {
				ID: id
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})
