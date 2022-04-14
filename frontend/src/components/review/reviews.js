import React, {useState, useRef} from 'react';
import Axios from 'axios';
import {Button, Input} from 'antd';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import FirstReview from './FirstReview';
import { useEffect } from 'react';
import ReplyReview from './ReplyReview';

const {TextArea} = Input;

const Reviews = (props) => {

    const currentUser = authService.getCurrentUser();
    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState(0);

    const handleChange = (e) => {
        setReview(e.target.value)
        // console.log(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            movieId: props.movieId,
            content: review,
            author: currentUser.id,
            reviewId: props.reviewId,
            sentimentScore : sentiment
        }

        Axios.post('http://localhost:8080/api/review/addReview', variables,{ headers: authHeader()})
        .then(response=> {
            if(response.data.success) {
                setReview("")
                props.refreshFunction(response.data.result)
                // console.log(JSON.stringify(review))
            } else {
                alert('Failed to save review')
            }
        })

    }
    
      useEffect(() => {
        async function fetchSentiment(review) {
        console.log(review)
        const result = await Axios.post('http://localhost:8080/api/sentiment/analysis', {data:review} , {headers: authHeader()})
              .then((response) => response.data);
                setSentiment(result.sentiment);
                console.log(sentiment)
                }
        fetchSentiment(review)
      }, [review])
  

      
    return (
        <div>
                <p>replies</p>
                {props.reviewList && props.reviewList.map((review, index) => (
                    (!review.responseTo &&
                    <React.Fragment key={review._id}>
                        <FirstReview review={review} movieId={props.movieId} refreshFunction={props.refreshFunctions}/>
                        <ReplyReview ReviewList={props.ReviewList} movieId={props.movieId} parentReviewId={review._id} refreshFunction={props.refreshFunction}/>
                    </React.Fragment>
                )))}
                <form style={{display: 'flex'}} onSubmit>
                    <TextArea
                        style={{width: '100%', borderRadius: '5px'}}
                        placeholder = "leave a review"
                        value={review}
                        onChange={handleChange}
                        />
                        <Button style = {{width: '20%', height: '52px'}} onClick={onSubmit}></Button>
                </form>
        </div>
    );
};

export default Reviews
