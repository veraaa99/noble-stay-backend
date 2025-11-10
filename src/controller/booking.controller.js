import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import CastleListing from '../models/listing.model.js'
import User from '../models/user.model.js'
import Booking from '../models/booking.model.js'

// import { useSearchParams } from "react-router"

export const createBooking = asyncHandler(async (req, res) => {
    let { castleId, bookedDates, bookedRooms, bookedGuests, bookedEvents } = req.body
    const bookedUser = req.user._id

    if(bookedEvents == '' || bookedEvents == "") {
        bookedEvents = undefined
    }

    if(!castleId || !bookedDates || !bookedRooms || !bookedGuests) {
        return res.status(400).json({ message: 'Please enter at least one date, one room and one guest to book'})
    }

    if(!castleId || !mongoose.Types.ObjectId.isValid(castleId)) {
        return res.status(400).json({ message: "Castle id is missing or invalid"})
    }

    const bookedCastle = await CastleListing.findById(castleId).exec()
    if(!bookedCastle) {
        return res.status(400).json({ message: "Castle could not be found"})
    }

    let totalSum = 0

    try {
        let roomQuantity = []
        let roomsSum = []

        for(let i=0; i< bookedRooms.length; i++) {
            roomQuantity.push(1)
        }

        bookedRooms.forEach(room => {
            roomsSum.push(room.price)
        })

        for(let i=0; i< roomQuantity.length; i++) {
            totalSum += roomQuantity[i] * roomsSum[i];
        }

    } catch (error) {
        return res.status(404).json({ message: 'An error occurred: One or several guests or rooms could not be found'})
    }

    const booking = await Booking.create({ castleId, bookedUser, bookedDates, bookedRooms, bookedGuests, bookedEvents, totalPrice: totalSum })
    res.status(201).json(booking)
})

export const getBookings = asyncHandler(async (req, res) => {
    const id  = req.user._id
    const user = await User.findById(id).exec()

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    if(!user) {
        return res.status(404).json({ message: 'User could not be found' })
    }

    const bookings = await Booking.find( { bookedUser: id })
    .populate({ 
        path: 'castleId', model:'CastleListing' })
    .exec()

    if(bookings.length == 0) {
        return res.status(200).json({ message: "No boookings placed yet"})
    }

    res.status(200).json(bookings)
})

export const getBooking = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)

    if(!id) {
        return res.status(404).json({ message: 'Error: No bookingId found' })
    }
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const booking  = await Booking.findById(id).exec()

    if(!booking) {
        return res.status(404).json({ message: 'Error: Booking could not be found' })
    }

    res.status(200).json(booking)
})