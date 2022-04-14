import React, {useState, useEffect } from "react";
import { Container, Container2, PosterImg, InfoColumn, MovieName, MovieInfo, Button } from "./movie-info.styles";
import { useParams } from "react-router-dom";
import Reviews from "../review/reviews";
import { getDetails } from "../../services/movieAPI.service";
import FavouriteComp from "../favourites/favourite.component";
import authHeader from '../../services/auth-header';
import Axios from 'axios';

const MovieInfoComponent = () => {
    const [reviewList, setReviewList] = useState([]);
    const [movieInfo, setMovieInfo] = useState();
    const {id} = useParams()

    useEffect( ()=>{
   
      (async ()=>{
        const response = await getDetails(id)
        setMovieInfo(response)
        //console.log(setMovieInfo);
      })();
      
    },[])
      
    const updateReview = (newReview) => {
      setReviewList(reviewList.concat(newReview))
    }

    useEffect(() => {
      Axios.post('http://localhost:8080/api/review/getReviews', {data:id}, { headers: authHeader()})
            .then(response => {
                if (response.data.success) {
                    console.log('All Reviews',response.data.reviews)
                    setReviewList(response.data.reviews)
                } else {
                    alert('Error')
                }
            })
    }, [])

  
    return (
      <Container>
          <PosterImg src = {`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`}/>
          <InfoColumn>
            <MovieName>
              {movieInfo?.title}
            </MovieName>
            <MovieInfo>
              Release Date: {movieInfo?.release_date}
            </MovieInfo>
            <MovieInfo>
              Average: {movieInfo?.vote_average}
            </MovieInfo>
            <MovieInfo>
              Plot: {movieInfo?.overview}
            </MovieInfo>
          </InfoColumn>
          <div>
          <FavouriteComp userFrom = {localStorage.getItem('userId')} movieInfo={movieInfo}/>
          </div>
          <div>
          <Container2>
            <Reviews refreshFunction={updateReview} reviewList={reviewList} movieId={movieInfo?.id}/>
          </Container2>
          </div>
      </Container>
    );
  };

export default MovieInfoComponent
