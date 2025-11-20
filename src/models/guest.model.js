import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    // _id: { type: Types.ObjectId() },    
    category: { type: String, required: true },
    number: { type: Number, required: true }
}, )

const Guest = mongoose.model('Guest', guestSchema)

export default Guest