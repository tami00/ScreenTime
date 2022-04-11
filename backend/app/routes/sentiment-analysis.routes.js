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
    const data = req.body.data
    const sentiment = getSentiment(data)
    return res.send({sentiment})
})

module.exports = router;