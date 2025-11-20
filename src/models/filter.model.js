import mongoose from "mongoose";

const filterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
});

const Filter = mongoose.model("Filter", filterSchema);

export default Filter;
