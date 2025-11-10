import mongoose from 'mongoose'
import asyncHandler from 'express-async-handler'
import CastleListing from '../models/listing.model.js'

export const createCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body
    const user = req.user._id

    if(!title || !images || !location || !description || !rules || !dates || !guests || !rooms || isEventAvaliable == undefined) {
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
        { title, images, location, description, amneties, rules, dates, guests, rooms, castleOwner: user, isEventAvaliable, events }
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
    
    const queryFilters = req.query;
    const isFilterIncluded = Object.keys(queryFilters).length
    const castleListings = await CastleListing.find().exec()

    let filteredCastleListings = []
    // TODO: Add size to castle listing?
    
    // Source - https://stackoverflow.com/questions/71417895/how-do-i-get-all-items-and-filter-queried-items-when-using-express
    // Posted by adhi narayan
    // Retrieved 2025-11-06, License - CC BY-SA 4.0
    if (isFilterIncluded) {
        filteredCastleListings = castleListings.filter(listing => {
            // location
            if (queryFilters.location) {
                if (listing.location.toLowerCase() !== queryFilters.location.toLowerCase()) {
                    return
                }
            }

            // dates
            if (queryFilters.to && queryFilters.from) {
                if (!listing.dates.includes(queryFilters.from) || !listing.dates.includes(queryFilters.to)) {
                    return
                }
            }

            // guests
            if (queryFilters.adult) {
                const adult = listing.guests.find(guest => guest.category == "adult")

                if (adult.number < queryFilters.adult) {
                    return
                }
            }

            if (queryFilters.child) {
                const child = listing.guests.find(guest => guest.category == "child")

                if (child.number < queryFilters.child) {
                    return
                }
            }

            if (queryFilters.pet) {
                const pet = listing.guests.find(guest => guest.category == "pet")

                if (pet.number < queryFilters.pet) {
                    return
                }
            }

            // rooms
            if (queryFilters.rooms) {
                if (listing.rooms.length < queryFilters.rooms) {
                    return
                }
            }

            // amneties
            if (queryFilters.amneties) {
                if (Array.isArray(queryFilters.amneties)) {
                    let matchingArray = listing.amneties.filter(amnety => queryFilters.amneties.includes(amnety));
                    if(matchingArray.length < queryFilters.amneties.length) {
                        return
                    }
                } else {
                    if (!listing.amneties.includes(queryFilters.amneties)) {
                        return
                    }
                }
            }

            // events
            if (queryFilters.events) {
                if (Array.isArray(queryFilters.events.isArray)) {
                    let matchingArray = listing.events.filter(amnety => queryFilters.events.includes(amnety));
                    if(matchingArray.length < queryFilters.events.length) {
                        return
                    }
                } else {
                    if (!listing.events.includes(queryFilters.events)) {
                        return
                    }
                }

            }

            return listing

        })
    }

    res.status(200).json(filteredCastleListings)
})

export const updateCastleListing = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = req.user._id
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const castleListing = await CastleListing.findById(id).exec()

    if(!castleListing) {
        return res.status(404).json({ message: 'Listing could not be found' })
    } else if (castleListing.castleOwner._id.toHexString() !== user) {
        return res.status(401).json({ message: 'You are not authenticated. The listing can only be updated by the castle owner.' })
    }

    const valuesToUpdate = {}

    if(title) {
        valuesToUpdate.title = title
    }
    if(images) {
        valuesToUpdate.images = images
    }
    if(location) {
        valuesToUpdate.location = location
    }
    if(description) {
        valuesToUpdate.description = description
    }
    if(amneties) {
        valuesToUpdate.amneties = amneties
    }
    if(rules) {
        valuesToUpdate.rules = rules
    }
    if(dates) {
        valuesToUpdate.dates = dates
    }
    if(guests) {
        valuesToUpdate.guests = guests
    }
    if(rooms) {
        valuesToUpdate.rooms = rooms
    }
    if(isEventAvaliable) {
        valuesToUpdate.isEventAvaliable = isEventAvaliable
    }
    if(events) {
        valuesToUpdate.events = events
    }

    if(Object.keys(valuesToUpdate).length === 0){
        res.status(400).json({ message: "No changes were made to the listing" })
    }
   
    const updatedListing = await CastleListing.findByIdAndUpdate(id, valuesToUpdate, { new: true }).exec()
    
    if(!updatedListing) {
        return res.status(404).json({ message: 'Listing could not be found' })
    }

    res.status(200).json(updatedListing)
})

export const deleteCastleListing = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = req.user._id

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const castleListing = await CastleListing.findById(id).exec()

    if(!castleListing) {
        return res.status(404).json({ message: 'Listing could not be found' })
    } else if (castleListing.castleOwner._id.toHexString() !== user) {
        return res.status(401).json({ message: 'You are not authenticated. The listing can only be removed by the castle owner.' })
    }

    const deletedCastleListing = await CastleListing.findByIdAndDelete(id).exec()

    if(!deletedCastleListing) {
        return res.status(404).json({ message: 'Listing could not be found' })
    }

    res.sendStatus(204)
})