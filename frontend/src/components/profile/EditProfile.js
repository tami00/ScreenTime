import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Typography, Button, Form, message, Input, InputNumber} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import authService from '../../services/auth.service';
import validator from 'validator'

const { Title } = Typography;
const { TextArea } = Input;

function EditProfile() {
    const currentUser = authService.getCurrentUser();

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [filePath, setFilePath] = useState("")
    const [sendVideo, setSendVideo] = useState(false)

    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        console.log('valid email')
      } else {
        setEmailError('Enter valid Email!')
      }
    }

    const uploadSuccess = () => {
        message.success('Video uploaded succesfully');
    };

    const detailsError = () => {
        message.error('Fill in all details');
    };

    const uploadError = () => {
        message.error('ERROR:There was an error uploading the video');
    };

    const handleChangeUsername = (e) => {
        setUsername(e.currentTarget.value)
    }

    const handleChangeEmail= (e) => {
        console.log(e.currentTarget.value)

        setEmail(e.currentTarget.value)
    }

    const handleChangeBio = (e) => {
        console.log(e.currentTarget.value)

        setBio(e.currentTarget.value)
    }

    const handleChangePhoneNo = (e) => {
        console.log(e.currentTarget.value)

        setPhoneNo(e.currentTarget.value)
    }

    const onSubmit = (event) => {
        // if (title === "" || description === "" || filePath === "") {
        //     return detailsError()
        // }

        // if (sendVideo===true){
        //     return uploadSuccess()
        // }
        
        // if(sendVideo===false) {
        //     return uploadError()
        // }
        

        event.preventDefault()

        const variables = {
            userFrom: currentUser.id,
            email: email,
            bio: bio,
            phoneNo:phoneNo,
            filePath: filePath
        }

        Axios.post('http://localhost:8080/api/auth/update', variables)
            .then(response => {
                if (response.data.success) {
                    console.log('Updated')
                    // return uploadSuccess()
                } else {
                    console.log('ERROR')
                    // return uploadError()
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

        Axios.post('http://localhost:8080/api/user/uploadFile', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log('Saved pic')
                    setFilePath(response.data.filePath)
                    // console.log(response.data.fileName)
                } else {
                    alert('Failed to save pic')
                }
            })

    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={3} > Edit Profile</Title>
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
                <label>Username</label>
                <Input
                    onChange={handleChangeUsername}
                    value={username}
                    style={{ width: 160 }}
                />
                <br /><br />
                <label>Email</label>
                <Input
                    onChange={handleChangeEmail}
                    value={email}
                    style={{ width: 160 }}
                />
                <br/><br/>
            <label>Price</label>
            <InputNumber
                 onChange={handleChangePhoneNo}
                 value={phoneNo}
            />
                <br /><br />
                <label>Bio</label>
                <TextArea
                    onChange={handleChangeBio}
                    value={bio}
                />
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default EditProfile