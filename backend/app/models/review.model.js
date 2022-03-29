const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    reviewId: String,
    content: String,
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    reponseTo: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
    ]
  })
);

module.exports = Review;