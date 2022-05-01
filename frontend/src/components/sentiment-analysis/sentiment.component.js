/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import { Card, Avatar, Space, Pagination } from 'antd';

const { Meta } = Card;


//pagination on 2nd

const SentimentComponent = (props) => {
  const currentUser = authService.getCurrentUser();
  const [otherReviewList, setOtherReviewList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(4)

  const id = props.userID;
  console.log("ID",id)

  const url = window.location.href 

  const handleChange = (value) => {
    if (value <= 1) {
      setMinValue(0)
      setMaxValue(4)
    } else {
      setMinValue(maxValue)
      setMaxValue(value * 4)
    }
  }

  useEffect(() => {
    if(!props.userID) return;
    Axios.post('http://localhost:8080/api/review/getOtherUserReviews', { data: id }, { headers: authHeader() })
        .then(response => {
            if (response.data.success) {
                console.log('Others Users Reviews', response.data)
                setOtherReviewList(response.data.reviews)
            } else {
                alert('Error')
            }
        })
},[props])

  useEffect(() => {
    Axios.post('http://localhost:8080/api/review/getUserReviews', { data: currentUser.id }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          // console.log('Users Reviews', response.data)
          setReviewList(response.data.reviews)
        } else {
          alert('Error')
        }
      })
  }, [])

  function render() {
    if (url.indexOf(id) > 1) {
      if (otherReviewList.length === 0) {
        return (
          <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>User does not have any reviews added</h2>
          </div>
        )
      } else {
        return (
          <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {otherReviewList && otherReviewList.slice(minValue, maxValue).map((review, index) => {
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
                        alt="neutral" />
                      : review.sentimentScore > 0 ?
                        <img
                          width={50}
                          src="https://as1.ftcdn.net/v2/jpg/02/15/08/80/1000_F_215088044_Ow0pypSekAamu3jZJnkRtfAyKj6KVlKj.jpg"
                          align="right"
                          alt="positive" />
                        : <img
                          width={50}
                          src="https://www.pinclipart.com/picdir/middle/82-822786_cartoon-angry-emoji-pictures-to-pin-on-pinterest.png"
                          align="right"
                          alt="negative" />
                      : ''}
                  </div>
                </Card>
              })}
            </Space>
            <Pagination
              simple defaultCurrent={1}
              defaultPageSize={4}
              onChange={handleChange}
              total={otherReviewList.length}
            />
          </div>

        )
      }
    } else if (url.indexOf('profile') > 1) {
      if (reviewList.length === 0) {
        return (
          <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Leave a review</h2>
          </div>
        )
      } else {
        return (
          <div>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              {reviewList && reviewList.slice(minValue, maxValue).map((review, index) => {
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
                        alt="neutral" />
                      : review.sentimentScore > 0 ?
                        <img
                          width={50}
                          src="https://as1.ftcdn.net/v2/jpg/02/15/08/80/1000_F_215088044_Ow0pypSekAamu3jZJnkRtfAyKj6KVlKj.jpg"
                          align="right"
                          alt="positive" />
                        : <img
                          width={50}
                          src="https://www.pinclipart.com/picdir/middle/82-822786_cartoon-angry-emoji-pictures-to-pin-on-pinterest.png"
                          align="right"
                          alt="negative" />
                      : ''}
                  </div>
                </Card>
              })}
            </Space>
            <Pagination
              simple defaultCurrent={1}
              defaultPageSize={4}
              onChange={handleChange}
              total={reviewList.length}
            />
          </div>
        )
      }
    }

  }



  return (
    <div style={{ maxWidth: '2000px', margin: '2rem auto' }}>
      {render()}


    </div>
  )
}

export default SentimentComponent;