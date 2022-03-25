import axios from 'axios';

const URL = `http://localhost:8080/`
const MOVIE_URL = `https://api.themoviedb.org/3/`
const API_KEY = `f134dfeac1ebb17feefa58d7f94e94cd`



//create 
const API = axios.create({
    baseURL: MOVIE_URL
  });

const uninterceptedAxiosInstance = axios.create({
    baseURL: MOVIE_URL
  });



  export {API,uninterceptedAxiosInstance,API_KEY}
