import {API,API_KEY} from "../utils/API";

async function getDetails(id)
{
  try {
    const response = await API.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`)
    return response?.data
  } catch (error) {
    console.log(error)
  }
}


export {getDetails}