/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const SentimentComponent = (props) => {
  const currentUser = authService.getCurrentUser();
  const [reviewList, setReviewList] = useState([]);

  // console.log(currentUser.id)

  useEffect(() => {
    Axios.post('http://localhost:8080/api/review/getUserReviews', { data: currentUser.id }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          console.log('Users Reviews', response.data)
          setReviewList(response.data.reviews)
        } else {
          alert('Error')
        }
      })
  }, [])



  return (
    <Container>
      {reviewList && reviewList.map((review, index) => {
        return <Card key = {index} review={review} style={{ width: 700 }}>
          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description eyglYWFGFLH UFEH I;;RIE GRILJGIJ HGUGE HG  HHHG HUG "
          />
        </Card>
      })}
    </Container>
  )
}

export default SentimentComponent;

//{reviewList && reviewList.length > 0 ? reviewList.map((review, index) =>
//<Row key = {index} review = {review}/>) : "You have no reviews"}
// {reviewList.map((review,index) =>{
//   <Card key = {index} style = {{width: 700}}