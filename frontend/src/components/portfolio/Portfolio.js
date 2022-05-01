import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Typography, Table } from 'antd';
import VideoPlayer from './VideoPlayer';
import authService from '../../services/auth.service'
import SentimentComponent from '../sentiment-analysis/sentiment.component';

const { Title } = Typography;

function Portfolio() {
  const currentUser = authService.getCurrentUser();
  const [videoDetails, setVideoDetails] = useState([])

  useEffect(() => {
    axios.post('http://localhost:8080/api/portfolio/getVideos', { data: currentUser.id })
      .then(response => {
        if (response.data.success) {
          console.log('VIDEO DETAILS:', response.data.videos)
          setVideoDetails(response.data.videos)
        } else {
          alert('Error')
        }
      })
  }, [])

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
      {videoDetails.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Upload to your portfolio</h2>
        </div> :
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {videoDetails.map((video, index) => (
            <VideoPlayer key={index} video={video} />
          ))}
        </div>

      }

    </div>
  )
}

export default Portfolio