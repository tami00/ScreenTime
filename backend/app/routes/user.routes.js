const {authJwt}  = require("../middlewares");
const controller = require("../controllers/user.controller");
const multer = require('multer')
const User = require('../models/user.model');

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

  app.post("/uploadFile", (req, res) => {

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
};
