const mongoose = require('mongoose');

const Favourite = mongoose.model(
    "Favourite",
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
//     userFrom: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     }, 
//     movieId : {
//         type: String
//     }, 
//     movieTitle : {
//         type: String
//     }, 
//     movieImg : {
//         type: String
//     }
// })

// const Favourite = mongoose.model('Favourite', favSchema);

module.exports = Favourite;