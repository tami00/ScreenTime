const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema({
    title: String,
    description: String,
    filePath: String,
    userFrom: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  })
);

module.exports = Video;