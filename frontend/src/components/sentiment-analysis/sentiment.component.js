import React,{useEffect} from 'react'
import {Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';

const SentimentComponent=(props) => {
  const currentUser = authService.getCurrentUser();

  console.log(currentUser.id)

  useEffect(() => {
    Axios.post('http://localhost:8080/api/review/getUserReviews', {data:currentUser.id}, { headers: authHeader()})
          .then(response => {
              if (response.data.success) {
                  console.log('Users Reviews',response.data)
                  // setReviewList(response.data.reviews)
              } else {
                  alert('Error')
              }
          })
  }, [])


  return (
    <Container>hi</Container>
  )
}

export default SentimentComponent;
