const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phoneNo: String,
    bio: String,
    filePath: String,
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = User;
