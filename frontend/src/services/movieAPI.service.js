import {API,API_KEY} from "../utils/API";


/**
 * search for movies on the moviedb
 * @params(string) title of the movie
 * @ return(object)
 */
 async function searchMovie(title)
 {
   try {
     const response = await API.get(`search/movie?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`)
     return response?.data
   } catch (error) {
     console.log(error)
   }
 }

 async function trailer(id)
 {
   try {
     const response = await API.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
     return response?.data
   } catch (error) {
     console.log(error)
   }
 }

 async function getDetails(id)
{
  try {
    const response = await API.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

async function getPopularMovies()
{
  try {
    const response = await API.get(`/movie/popular?api_key=${API_KEY}&language=en-US`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}

async function getUpcoming()
{
  try {
    const response = await API.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}
 
 
 export {searchMovie, trailer, getDetails, getPopularMovies, getUpcoming} 