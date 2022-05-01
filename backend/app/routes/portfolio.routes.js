const express =  require('express');
const router = express.Router();
const multer = require('multer')
const {authJwt} = require("../middlewares");
const Video = require("../models/video.model")

router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.mp4') {
          return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
      }
      cb(null, true)
  }
})

var upload = multer({ storage: storage }).single("file")

router.post("/uploadFile", (req, res) => {

  upload(req, res, err => {
      if (err) {
          return res.json({ success: false, err })
      }
      return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
  })

});

router.post("/uploadVideo", (req, res) => {

  const video = new Video(req.body)

  video.save((err, video) => {
    if(err) return res.status(400).json({success: false. err})
    return res.status(200).json({
      success: true
    })
  })
  
});

router.post("/getVideos", (req, res) => {
  Video.find({ userFrom: req.body.data }) 
  .populate('userFrom')
  .exec((err, videos) => {
      if(err) return res.status(400).send(err)
      res.status(200).json({success: true, videos})
  })
  
  
})



module.exports = router ;