const mongoose = require('mongoose');

const Review = mongoose.model(
  "Review",
  new mongoose.Schema({
    movieId: String,
    movieTitle: String,
    reviewId: String,
    content: String,
    sentimentScore: String,
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    responseTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  })
);

module.exports = Review;