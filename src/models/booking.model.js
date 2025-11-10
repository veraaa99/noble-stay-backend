import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    castleId: { type: mongoose.Schema.Types.ObjectId, ref: 'CastleListing', required: true },
    bookedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookedDates: { type: [String], required: true },
    bookedRooms: { type: mongoose.Schema.Types.Array, ref: 'Room', required: true },
    bookedGuests: { type: mongoose.Schema.Types.Array, ref: 'Guest', required: true },
    bookedEvents: { type: [String], default: undefined },
    totalPrice:  { type: Number, required: true }
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking