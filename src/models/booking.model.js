import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    castle: { type: mongoose.Schema.Types.ObjectId, ref: 'CastleListing', required: true },
    bookedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookedDates: { type: [Date], required: true },
    bookedRooms: { type: mongoose.Schema.Types.Array, ref: 'Room', required: true },
    bookedGuests: { type: mongoose.Schema.Types.Array, ref: 'Guest', required: true },
    bookedEvents: { type: [String] },
    totalPrice:  { type: Number, required: true }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking