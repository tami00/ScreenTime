const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    movieId : {
        type: String
    }, 
    movieTitle : {
        type: String
    }, 
    movieImg : {
        type: String
    }
})

const Favourite = mongoose.model('Favourite', favSchema);

module.exports = {Favourite}