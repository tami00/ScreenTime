const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phoneNo: String,
    bio: String,
    filePath: String
  })
);

module.exports = User;
