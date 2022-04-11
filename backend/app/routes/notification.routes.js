const express =  require('express');
const router = express.Router();
const { authJwt } = require("../middlewares");
const { route } = require('./favourite.routes');

    router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
});

route.post('/getU')