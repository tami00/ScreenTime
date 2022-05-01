import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import FutureFilms from "./futureFilms";

const FutureFilmsButton = styled.button`
  height: 30px;
  width: 40px;
`;

function FutureFilmsComponent(props) {
  const currentUser = authService.getCurrentUser();

  const [added, setAdded] = useState(false);

  const variable = {
    userFrom: currentUser.id,
    movieId: props.movieInfo?.id,
    movieTitle: props.movieInfo?.title,
    movieImg: props.movieInfo?.poster_path,
    movieDate: props.movieInfo?.release_date
  };

  const onClickAdd = () => {
    //if user already likes the film - remove it
    if (added) {
      Axios.post(
        "http://localhost:8080/api/futureFilms/removeFutureFilms",
        variable,
        { headers: authHeader() }
      ).then((response) => {
        if (response.data.success) {
            setAdded(response.data.added);
          console.log("Removed from future films");
        } else {
          alert("Failed to remove");
        }
      });

      //if not -  add to favourites
    } else {
      Axios.post(
        "http://localhost:8080/api/futureFilms/addToFutureFilms",
        variable,
        { headers: authHeader() }
      ).then((response) => {
        if (response.data.success) {
          setAdded(response.data.added);
          console.log("Added to future films");
        } else {
          alert("Failed to add");
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Axios.post("http://localhost:8080/api/futureFilms/added", variable, {
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          setAdded(response.data.added);
          console.log(response.data.added);
        } else {
          alert("Failed to get info");
        }
      });
    }, 200);
  }, []);

  return (
    <div>
      <FutureFilmsButton onClick={onClickAdd}>
        {!added ? "add" : "remove"}
      </FutureFilmsButton>
    </div>
  );
}

export default FutureFilmsComponent;