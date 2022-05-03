import React from "react";
import { useHistory } from "react-router-dom";// services
import { MovieCard, MovieName, InfoColumn, PosterImg, BottomDiv } from "./movie-item.styles";

const MovieItem = (props) => {
    const { title, release_date,poster_path, id } = props.movie;
    
    const history = useHistory();

    return (
      <MovieCard onClick={() => {
       history.push(`/films/${title}/${id}`)
      }}>
        <PosterImg src={`https://image.tmdb.org/t/p/original/${poster_path}`}></PosterImg>
        <BottomDiv>
        <MovieName>{title}</MovieName>
        <InfoColumn>
          <span>{release_date}</span>
        </InfoColumn>
        </BottomDiv>
      </MovieCard>
    );
  };
  
  export default MovieItem;