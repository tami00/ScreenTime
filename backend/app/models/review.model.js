const mongoose = require("mongoose");

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    movieId: String,
    reviewId: String,
    content: String,
    // sentimentScore: String,
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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