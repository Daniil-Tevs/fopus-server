import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { UserFields } from '../utils/user.utils.js'
import { generateToken } from './generate-token.js'

// @desc Auth user
// @route POST /api/auth/login/
// @access Public

export const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await prisma.people.findUnique({
		where: {
			EMAIL: email
		}
	})

	if (!user) {
		res.status(401)
		throw new Error('Email is not correct')
	}

	const isValidPassword = await verify(user.PASSWORD, password)

	if (!isValidPassword) {
		res.status(401)
		throw new Error('Password is not correct')
	}

	res.json({ user, token: generateToken(user.ID) })
})

// @desc Register user
// @route POST /api/auth/register/
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { surname, name, parentName, email, password, roleId } = req.body

	if (+roleId === 1) {
		res.status(401)
		throw new Error('Not permitted to register')
	}

	const isUserExists = await prisma.people.findUnique({
		where: {
			EMAIL: email
		}
	})

	if (isUserExists) {
		res.status(401)
		throw new Error('Exist user with such email')
	}

	const user = await prisma.people.create({
		data: {
			SURNAME: surname,
			NAME: name,
			PARENT_NAME: parentName,
			EMAIL: email,
			PASSWORD: await hash(password),
			ROLE_ID: +roleId
		},
		select: UserFields
	})

	res.json({ user, token: generateToken(user.ID) })
})
