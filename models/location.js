const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  user_id: String,
  name: String,
  latitude: String,
  longitude: String,
});

module.exports = mongoose.model("Location", locationSchema);
