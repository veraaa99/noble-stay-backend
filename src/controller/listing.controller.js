export const createCastleListing = async (req, res) => {

    const { title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events } = req.body

    console.log({ title, images, location, description, amneties, rules, dates, guests, rooms, isEventAvaliable, events })

}