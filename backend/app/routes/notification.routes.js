const express =  require('express');
const User = db.user;
const { route } = require('./favourite.routes');
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);
const moment = require('moment');

loggedInUser = (req, res, next) => {
  
}