const mongoose = require('mongoose');

const FutureFilms = mongoose.model(
    "FutureFilms",
    new mongoose.Schema({
        movieId : String,
        movieTitle: String,
        movieImg: String,
        movieDate: String,
        userFrom:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })

)


module.exports = FutureFilms;