import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react';
import authService from '../../services/auth.service';
import authHeader from '../../services/auth-header';

function FirstReview(props) {
  const currentUser = authService.getCurrentUser();
  const [reply, setReply] = useState(false);
  const [reviewValue, setReviewValue] = useState('');

  const handleChange = (e) => {
    setReviewValue(e.currentTarget.value);
  };

  const Reply = () => {
    setReply(!reply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      author: currentUser.id,
      movieId: props.movieId,
      responseTo: props.review._id,
      content: reviewValue,
    };

    Axios.post('http://localhost:8080/api/review/addReview', variables, {
      headers: authHeader(),
    }).then((response) => {
      if (response.data.success) {
        setReviewValue('');
        setReply(!reply);
        props.refreshFunction(response.data.result);
        props.handleRefresh();
      } else {
        alert('Failed to save review');
      }
    });
  };

  const action = [
    <span onClick={Reply} key="comment-basic-reply-to">
      reply
    </span>,
  ];

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
        <Comment.Content>
          <Comment.Author as="a">
            {' '}
            {props.review.author[0].username}{' '}
          </Comment.Author>
          <Comment.Text>
            <p>{props.review.content}</p>
          </Comment.Text>
          {!props.isNested && (
            <Comment.Actions>
              <Comment.Action>{action}</Comment.Action>
            </Comment.Actions>
          )}
        </Comment.Content>
      </Comment>

      {reply && (
        <form style={{ display: 'flex' }} onSubmit>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            placeholder="leave a review"
            value={reviewValue}
            onChange={handleChange}
          />
          {!props.isNested && (
            <Button
              content="Add Reply"
              labelPosition="left"
              icon="edit"
              primary
              onClick={onSubmit}
            />
          )}
        </form>
      )}
    </Comment.Group>
  );
}

export default FirstReview;