import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    // castle: { type: mongoose.Schema.Types.ObjectId, ref: 'CastleListing', required: true, default: undefined },
    category: { type: String, required: true },
    number: { type: Number, required: true }
}, )

const Guest = mongoose.model('Guest', guestSchema)

export default Guest