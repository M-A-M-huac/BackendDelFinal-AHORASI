const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const userRoutes = require('./routes/usersRoutes')
const reviewRoutes = require('./routes/reviewsRoutes')

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Root health check route (useful for PaaS like Render)
app.get('/', (req, res) => {
	res.send('API is running')
})

app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`))