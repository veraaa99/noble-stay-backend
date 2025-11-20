import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import CastleListing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createCastleListing = asyncHandler(async (req, res) => {
  const {
    title,
    images,
    location,
    description,
    amneties,
    rules,
    dates,
    guests,
    rooms,
    events,
  } = req.body;
  const user = req.user._id;

  if (
    !title ||
    !images ||
    !location ||
    !description ||
    !rules ||
    !dates ||
    !guests ||
    !rooms == undefined
  ) {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }

  if (title == "" || title == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (images == [""] || images == [""]) {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (location == "" || location == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (description == "" || description == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (rules == "" || rules == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (dates == "" || dates == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (guests == "" || guests == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (rooms == "" || rooms == "") {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }

  if (amneties == [""] || amneties == [""]) {
    return res.status(400).json({
      message: "Please enter all required fields to create a listing",
    });
  }
  if (events == [""] || events == [""]) {
    events = undefined;
  }

  const castleListing = await CastleListing.create({
    title,
    images,
    location,
    description,
    amneties,
    rules,
    dates,
    guests,
    rooms,
    castleOwner: user,
    events,
  });

  res.status(201).json(castleListing);
});

export const getCastleListings = asyncHandler(async (req, res) => {
  const castleListings = await CastleListing.find().exec();

  if (!castleListings) {
    return res.status(404).json({ message: "No listings could be found" });
  }

  res.status(200).json(castleListings);
});

export const getCastleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const castleListing = await CastleListing.findById(id).exec();

  if (!castleListing) {
    return res.status(404).json({ message: "Listing could not be found" });
  }

  res.status(200).json(castleListing);
});

export const getCastleListingByUser = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id).exec();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  if (!user) {
    return res.status(404).json({ message: "User could not be found" });
  }

  const castleListings = await CastleListing.find({ castleOwner: id }).exec();

  if (castleListings.length == 0) {
    return res.status(200).json({ message: "No listings created yet" });
  }

  res.status(200).json(castleListings);
});

export const getCastleListingsByFilter = asyncHandler(async (req, res) => {
  const queryFilters = req.query;
  const isFilterIncluded = Object.keys(queryFilters).length;
  const castleListings = await CastleListing.find().exec();

  let filteredCastleListings = [];

  // Source - https://stackoverflow.com/questions/71417895/how-do-i-get-all-items-and-filter-queried-items-when-using-express
  // Posted by adhi narayan
  // Retrieved 2025-11-06, License - CC BY-SA 4.0
  if (isFilterIncluded) {
    filteredCastleListings = castleListings.filter((listing) => {
      // location
      if (queryFilters.location) {
        const searchParamLocation = queryFilters.location
          .replace(/\s+/g, "")
          .replace(/[äåÄÅ]/g, "a")
          .replace(/[öÖ]/g, "o")
          .toLowerCase();

        const listingLocation = listing.location
          .replace(/\s+/g, "")
          .replace(/[äåÄÅ]/g, "a")
          .replace(/[öÖ]/g, "o")
          .toLowerCase();

        if (!listingLocation.includes(searchParamLocation)) {
          return;
        }
      }

      // dates
      if (queryFilters.from && queryFilters.to) {
        const matchingStartDate = listing.dates.filter((date) =>
          date.includes(queryFilters.from)
        );
        const matchingEndDate = listing.dates.filter((date) =>
          date.includes(queryFilters.to)
        );

        if (matchingStartDate.length == 0 || matchingEndDate.length == 0) {
          return;
        }
      }

      // guests
      if (queryFilters.adult) {
        const adult = listing.guests.find((guest) => guest.category == "adult");

        if (adult.number < queryFilters.adult) {
          return;
        }
      }

      if (queryFilters.child) {
        const child = listing.guests.find((guest) => guest.category == "child");

        if (child.number < queryFilters.child) {
          return;
        }
      }

      if (queryFilters.pet) {
        const pet = listing.guests.find((guest) => guest.category == "pet");

        if (pet.number < queryFilters.pet) {
          return;
        }
      }

      // rooms
      if (queryFilters.rooms) {
        if (listing.rooms.length < queryFilters.rooms) {
          return;
        }
      }

      // amneties
      if (queryFilters.amneties) {
        if (Array.isArray(queryFilters.amneties)) {
          let matchingArray = listing.amneties.filter((amnety) =>
            queryFilters.amneties.includes(amnety.id)
          );
          if (matchingArray.length < queryFilters.amneties.length) {
            return;
          }
        } else {
          if (
            listing.amneties.filter((amnety) =>
              amnety.id.includes(queryFilters.amneties)
            ).length == 0
          ) {
            return;
          }
        }
      }

      // events
      if (queryFilters.events) {
        if (Array.isArray(queryFilters.events.isArray)) {
          let matchingArray = listing.events.filter((event) =>
            queryFilters.events.includes(event.id)
          );
          if (matchingArray.length < queryFilters.events.length) {
            return;
          }
        } else {
          if (
            listing.events.filter((event) =>
              event.id.includes(queryFilters.events)
            ).length == 0
          ) {
            return;
          }
        }
      }

      return listing;
    });
  }

  res.status(200).json(filteredCastleListings);
});

export const updateCastleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user._id;
  const {
    title,
    images,
    location,
    description,
    amneties,
    rules,
    dates,
    guests,
    rooms,
    events,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const castleListing = await CastleListing.findById(id).exec();

  if (!castleListing) {
    return res.status(404).json({ message: "Listing could not be found" });
  } else if (castleListing.castleOwner._id.toHexString() !== user) {
    return res.status(401).json({
      message:
        "You are not authenticated. The listing can only be updated by the castle owner.",
    });
  }

  const valuesToUpdate = {};

  if (title) {
    valuesToUpdate.title = title;
  }
  if (images) {
    valuesToUpdate.images = images;
  }
  if (location) {
    valuesToUpdate.location = location;
  }
  if (description) {
    valuesToUpdate.description = description;
  }
  if (amneties) {
    valuesToUpdate.amneties = amneties;
  }
  if (rules) {
    valuesToUpdate.rules = rules;
  }
  if (dates) {
    valuesToUpdate.dates = dates;
  }
  if (guests) {
    valuesToUpdate.guests = guests;
  }
  if (rooms) {
    valuesToUpdate.rooms = rooms;
  }
  if (events) {
    valuesToUpdate.events = events;
  }

  if (Object.keys(valuesToUpdate).length === 0) {
    return res
      .status(400)
      .json({ message: "No changes were made to the listing" });
  }

  const updatedListing = await CastleListing.findByIdAndUpdate(
    id,
    valuesToUpdate,
    { new: true }
  ).exec();

  if (!updatedListing) {
    return res.status(404).json({ message: "Listing could not be found" });
  }

  res.status(200).json(updatedListing);
});

export const deleteCastleListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const castleListing = await CastleListing.findById(id).exec();

  if (!castleListing) {
    return res.status(404).json({ message: "Listing could not be found" });
  } else if (castleListing.castleOwner._id.toHexString() !== user) {
    return res.status(401).json({
      message:
        "You are not authenticated. The listing can only be removed by the castle owner.",
    });
  }

  const deletedCastleListing = await CastleListing.findByIdAndDelete(id).exec();

  if (!deletedCastleListing) {
    return res.status(404).json({ message: "Listing could not be found" });
  }

  res.sendStatus(204);
});
