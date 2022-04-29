const express =  require('express');
const router = express.Router();
const multer = require('multer')
const {authJwt} = require("../middlewares");
var ffmpeg = require('fluent-ffmpeg')

router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
    fileCheck: function (req, file, cb) {
       const type = path.extname(file.originalname)
       if(type !== '.mp4'){
           return cb(res.status(400).end('mp4 only'), false)
       }
       cb(null,true)
    }
  })
  
const upload = multer({ storage: storage }).single('file')

router.post("/uploadVideo", (req, res) => {
    
    upload(req,res,err => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({success:true, filePath: res.req.file.path, fileName: res.req.filename})
    })
    
})

router.post("/thumbnail", (req, res) => {

  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function(err, media) {
    console.dir(media)
    console.log(media.format.duration);

    fileDuration = media.format.duration;
  })


  ffmpeg('/path/to/video.avi')
  .on('filenames', function(filenames) {
    console.log('Will generate ' + filenames.join(', '))
    thumbsFilePath = "uploads/thumbnails"
  })
  .on('end', function() {
    console.log('Screenshots taken');
    return res.json({success: true, thumbsFilePath: ,fileDuration:})
  })
  .screenshots({
    // Will take screens at 20%, 40%, 60% and 80% of the video
    count: 3,
    folder: '/uploads/thumbnails'
  });

module.exports = router ;