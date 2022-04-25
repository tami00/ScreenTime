const express = require('express');
const router = express.Router();
const messagebird = require('messagebird')('HWrwY0QM7uZ7qk3SDobPO25ms');
const moment = require('moment');
const { authJwt } = require("../middlewares");

require('dotenv').config({});

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/notifications", [authJwt.verifyToken], (req, res) => {

    var result = req.body.data

    result.forEach(function (item) {
        const movieDate = item.movieDate;
        const userFrom = item.userFrom;
        const title = item.movieTitle;
        var earliestPossibleDT = moment().add(1,'days');;
        var releaseDT = moment(movieDate);
        if (releaseDT.isBefore(earliestPossibleDT)) {
            console.log(title + ' movie was released already')
        }

        //retrieve user phone number from inside array 
        userFrom.forEach(function (item ) {
            const username = item.username
            const digits = item.phoneNo 
            const countryCode = "353" 
            const phoneNo = countryCode + digits
            console.log(phoneNo)
            //check if phone number is valid
            messagebird.lookup.read(phoneNo, function (err, res){
                // console.log(err);
                // console.log(res)

                if (err&& err.errors[0].code == 21) {
                    //unknown format
                    console.log("Enter a valid number")
                }
                else {
                    if(err)
                    //different error
                     {
                        console.log("error")
                    }
                    else {
                        if (res.type != "mobile") {
                            console.log("Enter a mobile number")
                        }

                        else if (releaseDT.isBefore(earliestPossibleDT)){
                            console.log(title + " has already been released!")
                        }
                        else {
                            //schedule reminder week before release
                            // var reminderDT = releaseDT.clone().subtract(1, 'days');
                            var reminderDT = moment().add(5, 'minutes')
                            console.log(reminderDT)

                            messagebird.messages.create({
                                originator : "Movie App",
                                recipients: [phoneNo],
                                scheduledDatetime: reminderDT.format(),
                                body: "Hey " + username + ", don't forget that " + title + " is out next week on the "
                                + releaseDT.format('MMMM Do YYYY')
                            }, function (err, response) {
                                if (err) {
                                    //request failed
                                    console.log("ERROR sending message" + err);
                                } else {
                                    //successful
                                    console.log(response);
                                    console.log("Message sent")

                                }

                            })
                        }
                    }
                }
            })
        })
        
    });
})

router.get("/test", (req,res) => {
    messagebird.lookup.read('3530877611348', function (err, response) {
        if (err) {
          return console.log(err);
        }
        //  var reminderDT = moment().add(5, 'minutes')
        //  console.log(reminderDT)


      });
})

router.get("/testSMS/:phone", (req,res) => {
    const { phone } = req.params;

    if (!/^\+[1-9]{1}[0-9]{3,14}$/.test(phone)) {
        return res.status(400).send("Invalid phone number");
      }

    messagebird.messages.create({
        originator : 'Movie App',
        recipients : [phone],
        body : 'TESTING MESSAGE BIRD'
     }, function (err, response) {
        if (err) {
           console.log("ERROR:");
           console.log(err);
       } else {
           console.log("SUCCESS:");
           console.log(response);
       }
    });
})



module.exports = router;