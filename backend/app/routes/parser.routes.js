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

router.post('/parse', async (req, res) => {
    const data = req.body.data
    const film_title = data.movieTitle
    const screening_date = data.date

    const sendTimes = async () => {
    const time = await getTimes(film_title, screening_date)
    return await time
}

    res.send ({
        sendTimes: await sendTimes(),
        success: true
    })
})

module.exports = router;