const express = require('express');
const router = express.Router();
const messagebird = require('messagebird')('MESSAGEBIRD_API_KEY');
const moment = require('moment');
const { authJwt } = require("../middlewares");

require('dotenv').config();

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
            const phoneNo = item.phoneNo 
            //check if phone number is valid
            messagebird.lookup.read(phoneNo, process.env.COUNTRY_CODE, function (err, response){
                console.log(err);
                console.log(response)

                if (err&& err.errors[0].code == 21) {
                    //unknown format
                    console.log("Enter a valid number")
                }
                else {
                    if(err)
                    //different error
                     {
                        console.log("Error")
                    }
                    else {
                        if (response.type != mobile) {
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

module.exports = router;