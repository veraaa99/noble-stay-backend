import express from 'express'
import { createBooking, getBooking, getBookings } from '../controller/booking.controller.js'

const router = express.Router()

// TODO: Add webToken
router.post('/', createBooking)

router.get('/', getBookings)
router.get('/confirmed', getBooking)

export default router