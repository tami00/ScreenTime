import React, {useState, useRef} from 'react';
import {Typography, TextField, Button} from '@material-ui/core';
import {useDispatch} from 'react-redux';

const Reviews = ({movieInfo}) => {
    console.log(movieInfo);

    //const classes = useStyles();
    const [reviews, setReviews] = useState([1,2,3,4]);
    const [review, setReview] = useState('');
    //const currentUser = AuthService.getCurrentUser();
    //const dispatch = useDispatch();

    const handleClick  =() => {
        
    }

    return (
        <div>
            <div>
                <Typography gutterBottom variant="h6">Reviews</Typography>
                {reviews.map((rev, index) => (
                    <Typography key={index} gutterBottom variant='subtitle1'>
                        Review {index}
                    </Typography>
                ))}
            </div>
            <div style={{width: '70%'}}>
                <Typography gutterBottom variant="h6">Leave a review</Typography>
                <TextField
                    fullWidth
                    rows={4}
                    variant="outlined"
                    label="Review"
                    multiline
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <Button style={{marginTop: '10px'}} fullWidth disabled={!review} variant="contained" onClick={handleClick}>
                    Review
                </Button>
            </div>
        </div>
    );
};

export default Reviews
