const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const nodemailer = require("nodemailer")
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client("26894466814-75rfpg5m24l94rdqal8qq6ipo29hb9qk.apps.googleusercontent.com")

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    phoneNo: req.body.phoneNo
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "User was registered successfully!" });

    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, 
      auth: {
        user: "testfypuser@outlook.com", 
        pass: "1234567FYP!", 
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    });

    var mailOptions = {
      from: "testfypuser@outlook.com",
      to: user.email,
      subject: 'Thanks for registering with Movie App',
      text: 'Blah Blah blah'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });

  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      // }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        phoneNo: user.phoneNo,
        // roles: authorities,
        accessToken: token
      });
    });
};

exports.update = async (req, res) => {
  const user = await User.findById(req.body.userFrom);
  console.log(user);
  console.log(req.body.userFrom);
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.phoneNo = req.body.phoneNo || user.phoneNo;
    user.bio = req.body.bio || user.bio;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = user.save();

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      phoneNo: updatedUser.phoneNo,
      bio: updatedUser.bio,
      filePath: updatedUser.filePath,
      accessToken: token,
    });
  } else {
    res.status(404).send({ message: 'User Not found.' });
  }
};

exports.googlelogin = (req, res) => {
  const tokenId = req.body.data;
  // console.log(tokenId)
  client.verifyIdToken({idToken: tokenId, audience: "26894466814-75rfpg5m24l94rdqal8qq6ipo29hb9qk.apps.googleusercontent.com"})
  .then(response => {
    const {email_verified, name,email} = response.payload
    console.log(response.payload)
    if(email_verified){
      User.findOne({email}).exec((err,user) =>{
        if(err) {
          return res.status(404).send({ message: 'Something went wrong' });
        } else{
          if(user) {
            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400, // 24 hours
              
            });

            res.json({
              token,
              id: user._id
            })
        
          } else {
            let password =email+token
             let newUser = new User({name, email, password});

             newUser.save((err, data) => {
               if(err) {
                return res.status(404).send({ message: 'Something went wrong' });
               }
             })
             var token = jwt.sign({ id: data.id }, config.secret, {
              expiresIn: 86400, // 24 hours
              
            });

            res.json({
              token,
              id: newUser._id
            })



          }
        }
      })
    }

  })
}