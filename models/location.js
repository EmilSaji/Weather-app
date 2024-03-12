// models/location.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  user_id: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model("Location", locationSchema);
