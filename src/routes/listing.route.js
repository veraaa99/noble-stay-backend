import express from 'express'
import { createCastleListing, deleteCastleListing, getCastleListing, getCastleListings, updateCastleListing } from '../controller/listing.controller.js'

const router = express.Router()

router.post('/', createCastleListing)

router.get('/', getCastleListings)
router.get('/:id', getCastleListing)

router.put('/:id', updateCastleListing)
router.patch('/:id', updateCastleListing)

router.delete('/:id', deleteCastleListing)

export default router