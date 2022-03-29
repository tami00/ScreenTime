import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import authService from '../../services/auth.service';

const FavouriteButton = styled.button`
  height: 30px;
  width: 40px;
`;

function FavouriteComp(props) {

    const currentUser = authService.getCurrentUser();

    const [favouriteNumber, setFavouriteNumber] = useState(0);
    const [favourited, setFavourited] =  useState(false);

    const variable = {
        //change userFrom
        userFrom: currentUser.id,
        movieId: props.movieInfo?.id,
        movieTitle: props.movieInfo?.title,
        movieImg: props.movieInfo?.poster_path
    }
    
    useEffect(() => {

        Axios.post('/api/favourite/favouriteNumber', variable)
        .then(response => {
            if(response.data.success){
                setFavouriteNumber(response.data.favouriteNumber)
            }else {
                alert('Failed to get number');
            }
        })

        Axios.post('/api/favourite/favourited', variable) 
            .then(response =>{
                if(response.data.success){
                    setFavourited(response.data.favourited)
                }else {
                    alert('Failed to get info');
                }
            })

    }, [])

    const onClickFavourite = () => {
        if(favourited) {
            Axios.post('/api/favourite/removeFavorite', variable)
                .then(response =>{
                    if(response.data.success){
                        setFavouriteNumber(favouriteNumber - 1)
                        setFavourited(!favourited)
                    }else {
                        alert('Failed to remove');
                    }
                })

        }else {
            Axios.post('http://localhost:8080/api/favourite/addToFavourite', variable)
                .then(response =>{
                    if(response.data.success){
                        setFavouriteNumber(favouriteNumber + 1)
                        setFavourited(!favourited)
                    }else {
                        alert('Failed to add');
                    }
                })
        }
    }


    return (
        <div>
            <FavouriteButton onClick={onClickFavourite}>{favourited? "removed" : "add"}{favouriteNumber}</FavouriteButton>
        </div>
    )
}

export default FavouriteComp