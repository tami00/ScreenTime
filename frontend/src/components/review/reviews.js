import React, {useState, useRef} from 'react';
import Axios from 'axios';
import {Button, Input} from 'antd';
import authService from '../../services/auth.service'

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
            content: review,
            author: currentUser.id,
            reviewId: props.reviewId,
        }

        Axios.post('http://localhost:8080/api/review/addReview', variables)
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
                <hr></hr>
                {console.log(props.reviewList)}
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
