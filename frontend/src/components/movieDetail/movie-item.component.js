import React from "react";
import { useHistory } from "react-router-dom";// services
import { MovieCard, MovieName, InfoColumn, PosterImg } from "./movie-item.styles";

const MovieItem = (props) => {
    const { title, release_date,poster_path, id } = props.movie;
    
    const history = useHistory();

    return (
      <MovieCard onClick={() => {
       history.push(`/films/${title}/${id}`)
      }}>
        <PosterImg src={`https://image.tmdb.org/t/p/original/${poster_path}`}></PosterImg>
        <MovieName>{title}</MovieName>
        <InfoColumn>
          <span>{release_date}</span>
          <span>Movie</span>
        </InfoColumn>
      </MovieCard>
    );
  };
  
  export default MovieItem;