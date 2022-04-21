/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import { Card, Avatar, Space } from 'antd';

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
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {reviewList && reviewList.map((review, index) => {
          return <Card key={index} review={review} style={{ width: 700 }}>
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={review.movieTitle}
              description={review.content}
            />
            <div className="emoji">
              {review.sentimentScore ? review.sentimentScore === 0 ?
              <img
              width={50}
              src="https://images.emojiterra.com/twitter/v13.1/512px/1f610.png"
              align="right"
              alt="neutral"/> 
              :  review.sentimentScore > 0 ? 
              <img
              width={50}
              src="https://as1.ftcdn.net/v2/jpg/02/15/08/80/1000_F_215088044_Ow0pypSekAamu3jZJnkRtfAyKj6KVlKj.jpg"
              align="right"
              alt="positive"/> 
              : <img
              width={50}
              src="https://www.pinclipart.com/picdir/middle/82-822786_cartoon-angry-emoji-pictures-to-pin-on-pinterest.png"
              align="right"
              alt="negative"/> 
            : ''}
            </div>
          </Card>
        })}
      </Space>
    </Container>
  )
}

export default SentimentComponent;

//{reviewList && reviewList.length > 0 ? reviewList.map((review, index) =>
//<Row key = {index} review = {review}/>) : "You have no reviews"}
// {reviewList.map((review,index) =>{
//   <Card key = {index} style = {{width: 700}}