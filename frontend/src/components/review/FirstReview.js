import React from 'react'
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react'

const action = [
  <span onClick key="comment-basic-reply-to">reply</span>
]

function FirstReview(props) {
  // console.log();

  return (
    <Comment.Group>
    <Header as='h3' dividing>
      Comments
    </Header>
  
      <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'> {props.review.author[0].username}  </Comment.Author>
          <Comment.Text><p>{props.review.content}</p></Comment.Text>
          <Comment.Actions>
            <Comment.Action>{action}</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>

      <form style={{display: 'flex'}} onSubmit>
                    <TextArea
                        style={{width: '100%', borderRadius: '5px'}}
                        placeholder = "leave a review"
                        value={Comment}
                        onChange
                        />
                </form>
      {/* <Button content='Add Reply' labelPosition='left' icon='edit' primary /> */}
      </Comment.Group>
      ) 
  
}

export default FirstReview