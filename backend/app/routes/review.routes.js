const express =  require('express');
const router = express.Router();
const {authJwt} = require("../middlewares");
const Review = require("../models/review.model")

router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});


router.post("/addReview", [authJwt.verifyToken], (req, res) => {
    const review = new Review(req.body)

    review.save((err, review) => {
        if(err) return res.json({success:false, err})
        
        Review.find({'_id': review._id})
        .populate('author')
        .exec((err, result) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({success: true, result})
        })
    })
    
})

module.exports = router ;