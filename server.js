import 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import authRoute from './app/auth/auth.routes.js'
import feedbackRoute from './app/feedback/feedback.routes.js'
import goodRoute from './app/good/good.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import orderRoute from './app/order/order.routes.js'
import photoRoute from './app/photo/photo.routes.js'
import { prisma } from './app/prisma.js'
import userRoute from './app/user/user.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())

	app.use('/api/auth', authRoute)
	app.use('/api/good', goodRoute)
	app.use('/api/order', orderRoute)
	app.use('/api/feedback', feedbackRoute)
	app.use('/api/photo', photoRoute)
	app.use('/api/user', userRoute)

	app.use(notFound, errorHandler)

	app.listen(PORT, () =>
		console.log(
			`Server running on mode ${process.env.NODE_ENV} port ${PORT}`.blue.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
