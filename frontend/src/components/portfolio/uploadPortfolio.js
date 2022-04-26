import React, { useState, useEffect} from 'react'
import Axios from 'axios';
import { Typography, Button, Form, message, Input } from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import authHeader from '../../services/auth-header';

const { Title } = Typography;
const { TextArea } = Input;

function UpdatePortfolio() {

  const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");

    const handleChangeTitle = (e) => {
        setTitle(e.currentTarget.value)
    }

    const handleChangeDesc = (e) => {
        console.log(e.currentTarget.value)

        setDescription(e.currentTarget.value)
    }

    const onSubmit = () => {
        
    }

    const onDrop = (files) => {
      let formData = new FormData();
      const config = {
        headers: {
                'content-type': 'multipart/form-data'}
      }
      console.log(files)
      formData.append("file", files[0])

      Axios.post('http://localhost:8080/api/portfolio/uploadVideo', formData, config)
      .then(response=> {
          if(response.data.success) {           
              console.log(response)
          } else {
              alert('Failed to save video')
          }
      })

  }
    

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} > Upload Video</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <PlusOutlined style={{ fontSize: '3rem' }} />

                        </div>
                    )}
                </Dropzone>
            </div>

            <br/><br/>
            <label>Title</label>
            <Input
                 onChange={handleChangeTitle}
                 value={title}
            />
            <br/><br/>
            <label>Description</label>
            <TextArea
                 onChange={handleChangeDesc}
                 value={Description}
            />
            <br/><br/>

            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>

        </Form>
    </div>
  )
}

export default UpdatePortfolio