import Axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import {HeartOutlined, HeartFilled } from '@ant-design/icons'
import {Button} from 'antd';

const FavouriteButton = styled.button`
  height: 30px;
  width: 40px;
`;

function FavouriteComp(props) {
  const currentUser = authService.getCurrentUser();

  const [favourited, setFavourited] = useState(false);

  const variable = {
    userFrom: currentUser.id,
    movieId: props.movieInfo?.id,
    movieTitle: props.movieInfo?.title,
    movieImg: props.movieInfo?.poster_path,
  };

  const onClickFavourite = () => {
    //if user already likes the film - remove it
    if (favourited) {
      Axios.post(
        "http://localhost:8080/api/favourite/removeFavorite", variable, { headers: authHeader() }
      ).then((response) => {
        if (response.data.success) {
          setFavourited(response.data.favourited);
          console.log("Removed from favourites");
        } else {
          alert("Failed to remove");
        }
      });

      //if not -  add to favourites
    } else {
      Axios.post(
        "http://localhost:8080/api/favourite/addToFavourite", variable, { headers: authHeader() }
      ).then((response) => {
        if (response.data.success) {
          setFavourited(response.data.favourited);
          console.log("Added to favourites");
        } else {
          alert("Failed to add");
        }
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      Axios.post("http://localhost:8080/api/favourite/favourited", variable, {
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          setFavourited(response.data.favourited);
          console.log(response.data.favourited);
        } else {
          alert("Failed to get info");
        }
      });
    }, 200);
  }, []);

  return (
    <div>
      {!favourited ? 
      <Button icon={<HeartOutlined/>} onClick={onClickFavourite}/> 
      : <Button icon={<HeartFilled/>} onClick={onClickFavourite}/> }
      {/* <HeartOutlined onClick={onClickFavourite}>
        {!favourited ? "add" : "remove"}
      </HeartOutlined> */}
    </div>
  );
}

export default FavouriteComp;