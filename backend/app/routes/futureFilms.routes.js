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

router.post("/added", [authJwt.verifyToken], (req, res) => {
    FutureFilms.find({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, added) => {
      if (err) return res.status(400).send(err);
      console.log(added.length);
      let result = false;
      if (added.length !== 0) {
        result = true;
      }
  
      res.status(200).json({ success: true, added: result });
    });
  });
  

router.post("/addToFutureFilms", [authJwt.verifyToken], (req, res) => {
    
    const futureList = new FutureFilms(req.body)

    futureList.save((err, doc) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({success: true, doc})
    })
})

router.post("/removeFutureFilms", [authJwt.verifyToken], (req, res) => {
    FutureFilms.findOneAndDelete({
      movieId: req.body.movieId,
      userFrom: req.body.userFrom,
    }).exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({ added: false, success: true, doc });
    });
  });



router.post("/getFutureFilms", [authJwt.verifyToken], (req, res) => {
    FutureFilms.find({ userFrom: req.body.data }) 
    .populate('userFrom')
    .exec((err, films) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, films})
    })
    
    
})

router.post("/getOtherFutureFilms", [authJwt.verifyToken], (req, res) => {
  FutureFilms.find({ userFrom: req.body.data }) 
  .populate('userFrom')
  .exec((err, films) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({success: true, films})
  })
  
  
})

module.exports = router;