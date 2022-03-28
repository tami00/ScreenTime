import React, {useState, useRef} from 'react';
import {Button, Input} from 'antd';

const {TextArea} = Input;

const Reviews = ({movieInfo}) => {
    const [review, setReview] = useState('');

    const handleChange = (e) => {
        setReview(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: review,
            author: 
        }

        axios.post('api/review/addReview', variables)
    }

    return (
        <div>
                <p>Reviews</p>
                <hr></hr>
                <form style={{display: 'flex'}} onSubmit>
                    <TextArea
                        style={{width: '100%', borderRadius: '5px'}}
                        placeholder = "leave a review"
                        value={review}
                        onChange={handleChange}
                        />
                        <Button style = {{width: '20%', height: '52px'}}></Button>
                </form>
        </div>
    );
};

export default Reviews
