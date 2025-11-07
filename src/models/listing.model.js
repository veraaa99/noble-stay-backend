import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    images: { type: [String], required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amneties: { type: [String] },
    rules: { type: [String], required: true },
    dates: { type: [String], required: true },
    guests: { type: mongoose.Schema.Types.Array, ref: 'Guests', required: true },
    rooms: { type: mongoose.Schema.Types.Array, ref: 'Rooms', required: true },

    castleOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    isEventAvaliable: { type: Boolean, required: true },
    events: { type:  [String] }
})

const CastleListing = mongoose.model('CastleListing', listingSchema)

export default CastleListing