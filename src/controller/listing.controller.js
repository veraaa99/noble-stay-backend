import asyncHandler from 'express-async-handler'

export const createCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    // console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
    res.status(201).json({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
})

export const getCastleListings = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    // console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
    res.status(201).json({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
})

export const getCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    // console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
    res.status(201).json({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
})

export const updateCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    // console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
    res.status(201).json({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
})

export const deleteCastleListing = asyncHandler(async (req, res) => {
    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    // console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
    res.status(201).json({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })
})