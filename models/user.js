const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  created_at: String,
});

module.exports = mongoose.model("User", userSchema);
