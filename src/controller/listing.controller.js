import asyncHandler from 'express-async-handler'
import CastleListing from '../models/listing.model.js'
import mongoose from 'mongoose'

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
    if(rules == '' || rules == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(dates == '' || dates == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(guests == '' || guests == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }
    if(rooms == '' || rooms == "") {
        return res.status(400).json({ message: "Please enter all required fields to create a listing" })
    }

    if(amneties == '' || amneties == "") {
        amneties = undefined
    }
    if(events == '' || events == "") {
        events = undefined
    }

    const castleListing = await CastleListing.create(
        { title, images, location, description, amneties, rules, dates, guests, rooms, user, isEventAvaliable, events }
    )

    res.status(201).json(castleListing)
})

export const getCastleListings = asyncHandler(async (req, res) => {
    const castleListings = await CastleListing.find().exec()

    if(!castleListings) {
        return res.status(404).json({ message: 'No listings could be found' })
    }

    res.status(200).json(castleListings)
})

export const getCastleListing = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const castleListing = await CastleListing.findById(id).exec()

    if(!castleListing) {
        return res.status(404).json({ message: 'Listing could not be found'})
    }

    res.status(200).json(castleListing)
})

export const getCastleListingsByFilter = asyncHandler(async (req, res) => {
    const queryParams = new URLSearchParams(req.query);

    const params = [queryParams.get('location'), queryParams.get('guests')]
    const location = queryParams.getAll('location')


    // if(!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(400).json({ message: "Invalid id"})
    // }

    // const castleListing = await CastleListing.findById(id).exec()

    // if(!castleListing) {
    //     return res.status(404).json({ message: 'Listing could not be found'})
    // }
    // const castleListings = await CastleListing.find().exec()

    res.status(200).json(params)
})

export const updateCastleListing = asyncHandler(async (req, res) => {
    const {  } = req.body

    res.status(200).json({  })
})

export const deleteCastleListing = asyncHandler(async (req, res) => {
    const {  } = req.body

    res.status(204).json({  })
})