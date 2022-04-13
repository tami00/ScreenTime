const express =  require('express');
const router = express.Router();
const getSentiment = require('../sentiment-analysis/sentimentAnalysis')

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/analysis', (req, res) => {
    // console.dir(req.body)
    // console.log('REQ.BODY')
    if (req.body.hasOwnProperty('data')) {
    const data = req.body.data
    console.log('DATA ' + data)
    const sentiment = getSentiment(data)
    console.log(sentiment)
    res.send({
      sentimentScore: sentiment,
      success: true})
    }
    else {
      res.send('Failed')
    }   
})

module.exports = router;