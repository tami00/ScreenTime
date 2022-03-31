import React from 'react'
import {Comment, Avatar, Button, Input} from 'antd';
const {TextArea} = Input;

const action = [
  <span onClick key="comment-basic-reply-to">reply</span>
]


function FirstReview(props) {
  return (
    <div>
      <Comment
        actions = {action}
        author={props.author}
        content={
          <p>
            {props.content}
          </p>
        }
        >
        </Comment>

        <form style={{display: 'flex'}} onSubmit>
                    <TextArea
                        style={{width: '100%', borderRadius: '5px'}}
                        placeholder = "leave a review"
                        value={Comment}
                        onChange
                        />
                </form>
    </div>
  )
}

export default FirstReview