import express from 'express'
import Listing from '../models/listing.model.js'
import { createCastleListing } from '../controller/listing.controller.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('All castle listings')
})

router.post('/', createCastleListing)

router.get('/', () => {})
router.get('/*id', () => {})

router.put('/*id', () => {})

router.delete('/*id', () => {})

export default router