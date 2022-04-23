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
        // console.log(item.movieTitle);
        var earliestPossibleDT = moment().add(1,'days');;
        var reminderDT = moment(movieDate);
        if (reminderDT.isBefore(earliestPossibleDT)) {
            // console.log('This movie was released already')
        }

        //retrieve user phone number from inside array 
        userFrom.forEach(function (item ) {
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

                        else {
                            console.log("All good")
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
        return console.log(response.countryCode);
      });
})

module.exports = router;