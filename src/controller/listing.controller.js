import asyncHandler from 'express-async-handler'
import CastleListing from '../models/listing.model.js'

export const createCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body
    const user = req.user._id

    if(!title || !images || !location || !description || !rules || !dates || !guests || !rooms || !isEventAvaliable) {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }

    if(title == '' || title == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(images == '' || images == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(location == '' || location == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(description == '' || description == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(rules.isEmpty()) {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(dates.isEmpty()) {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(guests.isEmpty()) {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(rooms.isEmpty()) {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }

    if(amneties.isEmpty()) {
        amneties = undefined
    }
    if(events.isEmpty()) {
        events = undefined
    }

    const castleListing = await CastleListing.create(
        { title, images, location, description, amneties, rules, dates, guests, rooms, user, isEventAvaliable, events }
    )

    res.status(201).json(castleListing)
})

export const getCastleListings = asyncHandler(async (req, res) => {
    const listings = await CastleListing.find().exec()

    if(!listings) {
        return res.status(404).json({ message: 'No listings could be found' })
    }

    res.status(200).json(listings)
})

export const getCastleListing = asyncHandler(async (req, res) => {
   const {  } = req.body

    res.status(200).json({  })
})

export const updateCastleListing = asyncHandler(async (req, res) => {
    const {  } = req.body

    res.status(200).json({  })
})

export const deleteCastleListing = asyncHandler(async (req, res) => {
    const {  } = req.body

    res.status(204).json({  })
})