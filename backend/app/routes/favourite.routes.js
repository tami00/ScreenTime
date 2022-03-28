const express =  require('express');
const router = express.Router();
const {authJwt} = require("../middlewares");

router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});


router.post("/favouriteNumber", [authJwt.verifyToken], (req, res) => {
    Favourite.find({"movieId": req.body.movieId})
        .exec((err, favourite) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({success: true, favouriteNumber: favourite.length})
        })
})

router.post("/favourited", [authJwt.verifyToken], (req, res) => {
    Favourite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
        .exec((err, favourite) => {
            if(err) return res.status(400).send(err) 

            let result = false;
            if(favourite.length !== 0) {
                result = true
            }

            res.status(200).json({success: true, favourited: result});


        })
})

router.post("/addToFavourite", [authJwt.verifyToken], (req, res) => {
    
    const favourite = new Favourite(req.body)

    favourite.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, doc})
    })
})

router.post("/removeFavorite", [authJwt.verifyToken], (req, res) => {
    
    Favourite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, doc})
        })
})

module.exports = router ;