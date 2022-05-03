import React from 'react';
import FirstReview from './FirstReview';

function ReplyReview(props) {
  let loadReply = (parentReviewId) => {
    console.log(parentReviewId);
    return props.ReviewList.map((review, index) => (
      <div>
        {review.responseTo === parentReviewId && (
          <div style={{ marginLeft: '50px', width: '80%' }}>
            <FirstReview
              review={review}
              movieId={props.movieId}
              refreshFunction={props.refreshFunctions}
              isNested={true}
            />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <p style={{ fontSize: '14px', margin: 0, color: 'black' }} onClick>
        {' '}
        {/* View replies */}
      </p>
      {loadReply(props.parentReviewId)}
    </div>
  );
}

export default ReplyReview;