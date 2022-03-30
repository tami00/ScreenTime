import React, {useState, useRef} from 'react';
import Axios from 'axios';
import {Button, Input} from 'antd';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import FirstReview from './FirstReview';

const {TextArea} = Input;

const Reviews = (props) => {

    const currentUser = authService.getCurrentUser();

    const [review, setReview] = useState('');

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            movieId: props.movieId,
            content: review,
            author: currentUser.id,
            reviewId: props.reviewId,
        }

        Axios.post('http://localhost:8080/api/review/addReview', variables,{ headers: authHeader()})
        .then(response=> {
            if(response.data.success) {
                setReview("")
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save review')
            }
        })
    }

    return (
        <div>
                <p>Reviews</p>
                
                {console.log(props.reviewList)}

                {props.reviewList && props.reviewList.map((review, index) => (
                    (!review.responseTo &&
                    <React.Fragment key={review._id}>
                        <FirstReview review={review} movieIId={props.movieId} refreshFunction={props.refreshFunctions}/>
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
