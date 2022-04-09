// import aposToLexForm from "apos-to-lex-form";
// import {WordTokenizer} from 'natural';
// import SpellCorrector from "spelling-corrector";
// import stopword from "stopword";

const aposToLexForm = require("apos-to-lex-form");
const {WordTokenizer, SentimentAnalyzer, PorterStemmer} =  require("natural");
const SpellCorrector = require("spelling-corrector");
const stopword =  require("stopword");

const tokenizer = new WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn')

function getSentiment(text){
    if(!text.trim()) {
        return 0;
    }

    const lexed = aposToLexForm(text).toLowerCase().replace(/[^a-zA-Z\s]+/g, "");

    const tokenized = tokenizer.tokenize(lexed)
    
    const correctSpelling = tokenized.map((word) => spellCorrector.correct(word))

    const stopWordsRemoved =  stopword.removeStopwords(correctSpelling)

    console.log(stopWordsRemoved)

    const analyzed = analyzer.getSentiment(stopWordsRemoved);

    console.log(analyzed)

}

module.exports = getSentiment;

console.log(getSentiment("Wow this is fantaztic!"))
console.log(getSentiment("let's go together?"))
console.log(getSentiment("this is so bad, I hate it, it sucks!"))