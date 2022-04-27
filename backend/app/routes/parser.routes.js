const express = require('express');
const router = express.Router();
const getTimes = require('../parser/parser')

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/parse', (req, res) => {
    console.log(req.body)
    console.log('REQ.BODY')
    const data = req.body.data
    const film_title = data.movieTitle
    const screening_date = data.date

    async function logTimes() {
        console.log(await getTimes(film_title, screening_date))
        // console.log(await getTimes("Doctor Strange In The Multiverse Of Madness","2022-05-05"))
    }
    logTimes()
    // const parse = await getTimes(film_title,screening_date)
    // console.log(parse)
    // if (req.body.hasOwnProperty('data')) {
    // const data = req.body.data
    // console.log('DATA ' + data)
    // }   
})

module.exports = router;