import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MovieItem from "./movie-item.component"
import {searchMovie} from '../../services/search.service'
import { useHistory } from "react-router-dom";// services

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;


const MovieListComponent = (props) => {

  const [movieList,setMovieList] = useState([])
  const {title} = useParams()
  const history = useHistory();

  useEffect( ()=>{
   
    (async ()=>{
      const response = await searchMovie(title)
      setMovieList(response?.results)
    })();
    
  },[])
  return (
    <MovieListContainer onClick={() => {
      //history.push(`/films/${props.movieList.movie.id}`)

    }}>
      {/* {console.log(movieList)} */}
      {movieList && movieList.length > 0
          ? movieList.map((movie, index) => <MovieItem key={index} movie={movie}/>)
          : "No Movie Search"}
    </MovieListContainer>
  );
};

export default MovieListComponent;
