const express =  require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const FutureFilms = require("../models/futureFilms.model")

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/addToFutureFilms", [authJwt.verifyToken], (req, res) => {
    
    const futureList = new FutureFilms(req.body)

    futureList.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, doc})
    })
})

router.post("/getFutureFilms", [authJwt.verifyToken], (req, res) => {
    FutureFilms.find({"userId": req.body.data}) 
    // console.log("ID ", req.body.data)
    .populate('author.user')
    .exec((err, films) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, films})
    })
    
})

module.exports = router;