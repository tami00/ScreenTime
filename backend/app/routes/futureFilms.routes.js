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

module.exports = router;