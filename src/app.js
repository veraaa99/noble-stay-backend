import express from 'express'
import listingRoutes from './routes/listing.route.js'
import userRoutes from './routes/user.route.js'
import bookingRoutes from './routes/booking.route.js'

const app = express()

app.use(express.json())

// TODO: Install CORS
// app.use(cors())
// app.use(express.json({ limit: '16MB', extended: false }));

app.use('/api/listings', listingRoutes)
app.use('/api/users', userRoutes)
app.use('/api/bookings', bookingRoutes)

export default app