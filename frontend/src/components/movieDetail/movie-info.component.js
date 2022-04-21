import React, {useState, useEffect } from "react";
import { Container, Container2, PosterImg, InfoColumn, MovieName, MovieInfo, Button } from "./movie-info.styles";
import { useParams } from "react-router-dom";
import Reviews from "../review/reviews";
import { getDetails } from "../../services/movieAPI.service";
import { trailer } from "../../services/movieAPI.service";
import { BiLoaderAlt } from "react-icons/bi";
import {IoCloseOutline} from "react-icons/io5";
import FavouriteComp from "../favourites/favourite.component";
import FutureFilms from "../futureFilms/futureFilms.component";

const MovieInfoComponent = () => {
    const link = "https://www.youtube.com/embed/{4UZrsTqkcW4}"
    const[trailerDetails, setTrailerDetails] = useState();
    const [movieInfo, setMovieInfo] = useState();
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const [ReviewLists, setReviewLists] = useState([]);
    const {id} = useParams()
    //console.log(id)

    useEffect( ()=>{
   
      (async ()=>{
        const response = await getDetails(id)
        setMovieInfo(response)
        //console.log(setMovieInfo);
      })();
      
    },[])

  // const getTrailer = () =>{
      
    useEffect(() => {
      console.log(trailerDetails?.results)
    }, [trailerDetails]);

    const handleClick = async () => {
      const res =  await trailer(id);
      setTrailerDetails(res);
    }

    const openModal = () => {
      setModal(!modal);
    };

    const spinner = () => {
      setVideoLoading(!videoLoading);
    };


    const updateReview = (newReview) => {
      setReviewLists(ReviewLists.concat(newReview))
  }
  
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
          <FutureFilms movieInfo={movieInfo}/>
          </div>
          <div>
          <Container2>
            <Reviews movieInfo = {movieInfo} refreshFunction={updateReview} movieId={movieInfo?.id} movieTitle={movieInfo?.title}/>
          </Container2>
          </div>
      </Container>
    );
  };

export default MovieInfoComponent
