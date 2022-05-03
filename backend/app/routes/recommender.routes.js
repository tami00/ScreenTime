const express = require('express');
const router = express.Router();
const { authJwt } = require('../middlewares');
const axios = require('axios');
const Favourite = require('../models/favourite.model');

router.get('/home', [authJwt.verifyToken], async function (req, res) {
  const userId = req.userId;

  //Fetch Faves from DB
  //Try catch prevent server from crashing
  let faves;
  try {
    faves = await Favourite.find({ userFrom: userId });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
  const faveTitles = [];
  faves.forEach((fave) => faveTitles.push(fave.movieTitle));

  axios
    .post(`http://127.0.0.1:5000/flask?id=${userId}`, { titles: faveTitles })
    .then(({ data }) => {
      return res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;