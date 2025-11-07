import express from 'express'
import { createBooking, getBooking, getBookings } from '../controller/booking.controller.js'
import { verifyToken } from '../middleware/verification.middleware.js'

const router = express.Router()

// TODO: Add webToken
router.post('/', verifyToken, createBooking)

router.get('/', verifyToken, getBookings)
router.get('/confirmed/:id', verifyToken, getBooking)

export default router