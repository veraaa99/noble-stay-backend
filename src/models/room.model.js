import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    // castle: { type: mongoose.Schema.Types.ObjectId, ref: 'CastleListing', required: true, default: undefined },
    title: { type: String, required: true },
    caption: { type: String, required: true },
    description: { type: [String], required: true },
    price: { type: Number, required: true }
}, )

const Room = mongoose.model('Room', roomSchema)

export default Room