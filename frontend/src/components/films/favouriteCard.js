import React from 'react'
import { useHistory } from "react-router-dom";// services
import {PosterImg, MovieName} from "../movieDetail/movie-info.styles"
import {MovieCard} from "./films-item.styles"

function FavouriteCard(props) {
    const { movieTitle, movieImg, movieId } = props.films;
    
    const history = useHistory();
    return (
        <MovieCard onClick={() => {
         history.push(`/films/${movieTitle}/${movieId}`)
        }}>
          <PosterImg src={`https://image.tmdb.org/t/p/original/${movieImg}`}></PosterImg>
          <MovieName>{movieTitle}</MovieName>
        </MovieCard>
      );
}

export default FavouriteCard