import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import authHeader from '../../services/auth-header';
import authService from '../../services/auth.service';

const AddButton = styled.button`
  height: 30px;
  width: 40px;
`;


function FutureFilms (props) {

    const currentUser = authService.getCurrentUser();

    const variable = {
        //change userFrom
        userFrom: currentUser.id,
        movieId: props.movieInfo?.id,
        movieTitle: props.movieInfo?.title,
        movieImg: props.movieInfo?.poster_path,
        movieDate: props.movieInfo?.release_date
    }

    const onClick = () => {
        Axios.post('http://localhost:8080/api/futureFilms/addToFutureFilms', variable, { headers: authHeader() })
                .then(response =>{
                    if(response.data.success){
                        console.log("Added", response.data)
                    }else {
                        alert('Failed to add');
                    }
                })
    }

    useEffect(() => {
        Axios.post('http://localhost:8080/api/futureFilms/getFutureFilms', {data:currentUser.id}, { headers: authHeader()})
              .then(response => {
                  if (response.data.success) {
                      console.log('Users Future Films',response.data)
                      // setReviewList(response.data.reviews)
                  } else {
                      alert('Error')
                  }
              })
      }, [])

  return (
    <div>
       <AddButton onClick={onClick}/>
    </div>
  )
}

export default FutureFilms;