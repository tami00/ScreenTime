import React from 'react'
import FirstReview from './FirstReview'

function ReplyReview(props) {

    let loadReply = (parentReviewId) => {
        props.ReviewList && props.ReviewList.map((review, index) => (
            <React.Fragment>
                {review.responseTo === parentReviewId}
                <div style={{marginLeft: '50px', width: '80%'}}>
            <FirstReview review={review} movieId={props.movieId} refreshFunction={props.refreshFunctions}/>
            <ReplyReview  ReviewList={props.ReviewList} movieId={props.movieId} parentReviewId={review._id} refreshFunction={props.refreshFunctions}/>
            </div>
        </React.Fragment>
    ))
    }







  return (
    <div>
        <p style={{fontSize: '14px', margin: 0, color: 'black'}} onClick > View replies
        </p>
        {loadReply(props.parentReviewId)}

    </div>
  )
}

export default ReplyReview