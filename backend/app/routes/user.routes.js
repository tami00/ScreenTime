const {authJwt}  = require("../middlewares");
const controller = require("../controllers/user.controller");
const multer = require('multer')
const User = require('../models/user.model');
const { findByIdAndUpdate } = require("../models/user.model");
const { user } = require("../models");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      console.log(req.header["x-access-token"]),
      console.log(req.header),
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

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

  app.post("/api/uploadFile", (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
  
  });

  app.get('/api/search', async function (req, res, next) {
    const { username } = req.query;
    console.log(username);
    if (!username) return res.send({ users: [] });
    let users;
    try {
      users = await User.find(
        { username: { $regex: username, $options: 'i' } },
        'username'
      );
    } catch (err) {
      console.log(err);
      return res.send({ users: [] });
    }

    res.send({ users });
  });

  app.get('/api/user', async function (req, res, next) {
    const { id } = req.query;
    if (!id) return res.sendStatus(400); //Bad Request because ID was not provided
    let user;
    try {
      user = await User.findById(id, 'username');
    } catch (err) {
      console.log(err);
      return res.sendStatus(500); //Internal Server Error
    }

    res.send(user);
  });

  app.put('/api/follow', async function (req, res, next){
    const { id } = req.query;
    const userFrom = req.body.data

    console.log('OTHER USER ID',id)
    console.log('CURRENT ID', userFrom)

    User.findByIdAndUpdate(id), {
      $push:{followers:req.body.data}
    },{new:true},
  (err,result)=>{
    if(err) {
      if(err) return res.status(400).send(err)
    }
    User.findByIdAndUpdate(req.body.data), {
      $push:{following:id}
    },{new:true}.then(result=> {
      res.json(result)
    }).catch(err=>{
      return res.status(422).json({error:err})
    })   
  }
  })

  app.put('/api/unfollow', async function (req, res, next){
    
    User.findByIdAndUpdate({ unfollowID: req.body.data }), {
      $pull:{followers:{ userFrom: req.body.data }}
    },{new:true},
  (err,result)=>{
    if(err) {
      if(err) return res.status(400).send(err)
    }
    User.findByIdAndUpdate({ userFrom: req.body.data }), {
      $pull:{following:{ unfollowID: req.body.data }}
    },{new:true}.then(result=> {
      res.json(result)
    }).catch(err=>{
      return res.status(422).json({error:err})
    })   
  }
  })

  app.get('/api/getUserDetails', async function (req, res, next) {
    const { id } = req.query;
    User.findById(id)
    .exec((err, details) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, details})
    })
  });
};

