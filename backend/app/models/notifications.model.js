const mongoose = require('mongoose');

const Notifications = mongoose.model(
    "Notifications",
    new mongoose.Schema({
        movieId : String,
        movieTitle: String,
        movieImg: String,
        userFrom:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    })

)