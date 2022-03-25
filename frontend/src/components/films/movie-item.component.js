import React, {useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";// services
import {searchMovie} from '../../services/search.service'

const MovieCard = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 280px;
box-shadow: 0 3px 10px 0 #aaa;
cursor: pointer;
gap: 24px;
`;
const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PosterImg = styled.img`
  object-fit: cover;
  height: 721px;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

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