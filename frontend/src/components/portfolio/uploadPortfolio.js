import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Typography, Button, Form, message, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import authService from '../../services/auth.service';

const { Title } = Typography;
const { TextArea } = Input;

function UpdatePortfolio() {
    const currentUser = authService.getCurrentUser();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [filePath, setFilePath] = useState("")
    const [sendVideo, setSendVideo] = useState(false)

    const uploadSuccess = () => {
        message.success('Video uploaded succesfully');
    };

    const detailsError = () => {
        message.error('Fill in all details');
    };

    const uploadError = () => {
        message.error('ERROR:There was an error uploading the video');
    };

    const handleChangeTitle = (e) => {
        setTitle(e.currentTarget.value)
    }

    const handleChangeDesc = (e) => {
        console.log(e.currentTarget.value)

        setDescription(e.currentTarget.value)
    }

    const onSubmit = (event) => {
        if (title === "" || description === "" || filePath === "") {
            return detailsError()
        }

        // if (sendVideo===true){
        //     return uploadSuccess()
        // }
        
        // if(sendVideo===false) {
        //     return uploadError()
        // }
        

        event.preventDefault()

        const variables = {
            userFrom: currentUser.id,
            title: title,
            description: description,
            filePath: filePath
        }

        Axios.post('http://localhost:8080/api/portfolio/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('Uploaded video')
                    return uploadSuccess()
                } else {
                    console.log('ERROR')
                    return uploadError()
                }
            })

    }

    const onDrop = (files) => {
        let formData = new FormData();
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(files)
        formData.append("file", files[0])

        Axios.post('http://localhost:8080/api/portfolio/uploadFile', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log('Saved video')
                    setFilePath(response.data.filePath)
                    // console.log(response.data.fileName)
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

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDesc}
                    value={description}
                />
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default UpdatePortfolio