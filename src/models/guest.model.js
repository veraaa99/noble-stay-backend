import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    category: { type: String, required: true },
    number: { type: Number, required: true }
}, { autoCreate: false })

const Guest = mongoose.model('Guest', guestSchema)

export default Guest