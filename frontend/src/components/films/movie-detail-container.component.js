import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MovieItem from "./movie-item.component"
import {searchMovie} from '../../services/search.service'

const MovieInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;

const MovieDetailComponent = () => {
    return (
      <MovieInfoContainer>
          Hello
      </MovieInfoContainer>
    );
  };

  export default MovieDetailComponent;