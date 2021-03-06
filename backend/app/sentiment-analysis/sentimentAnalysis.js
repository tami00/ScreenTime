const aposToLexForm = require("apos-to-lex-form");
const {WordTokenizer, SentimentAnalyzer, PorterStemmer} =  require("natural");
const SpellCorrector = require("spelling-corrector");
const stopword =  require("stopword");

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')

function getSentiment(text){
    // console.log(typeof text)
    if(!text.trim()) {
        return 0;
    }

    const lexed = aposToLexForm(text).toLowerCase().replace(/[^a-zA-Z\s]+/g, "");

    const tokenized = tokenizer.tokenize(lexed)
    
    const correctSpelling = tokenized.map((word) => spellCorrector.correct(word))

    const stopWordsRemoved =  stopword.removeStopwords(correctSpelling)

    const analyzed = analyzer.getSentiment(stopWordsRemoved);

    if (analyzed >=1) {
        return 1
    }

    else if (analyzed === 0) {
        return 0
    }

    else {
        return -1
    }

    // console.log(analyzed)

}

module.exports = getSentiment;

// console.log(getSentiment("Wow this is fantaztic!"))
// console.log(getSentiment("let's go together?"))
// console.log(getSentiment("this is so bad, I hate it, it sucks!"))