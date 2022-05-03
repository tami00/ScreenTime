import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Typography, Table } from 'antd';
import VideoPlayer from './VideoPlayer';
import authService from '../../services/auth.service'
import SentimentComponent from '../sentiment-analysis/sentiment.component';

const { Title } = Typography;

function Portfolio(props) {
  const currentUser = authService.getCurrentUser();
  const [videoDetails, setVideoDetails] = useState([])
  const [otherVideoDetails, otherSetVideoDetails] = useState([])
  const [loading, setLoading] = useState(true);

  const id = props.userID;

    const url = window.location.href 

  useEffect(() => {
    axios.post('http://localhost:8080/api/portfolio/getVideos', { data: currentUser.id })
      .then(response => {
        if (response.data.success) {
          console.log('VIDEO DETAILS:', response.data.videos)
          setVideoDetails(response.data.videos)
          setTimeout(() => setLoading(false), 300);
        } else {
          alert('Error')
        }
      })
  }, [])

  useEffect(() => {
    axios.post('http://localhost:8080/api/portfolio/getUserOtherVideos', { data: id })
      .then(response => {
        if (response.data.success) {
          console.log('OTHER YSER VIDEO DETAILS:', response.data.videos)
          otherSetVideoDetails(response.data.videos)
          setTimeout(() => setLoading(false), 300);
        } else {
          alert('Error')
        }
      })
  }, [])

  function render (){
    if(url.indexOf(id) > 1) {
        if(!loading && otherVideoDetails.length === 0){
            return (
               <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                <h2>User does not have any videos added</h2>
               </div> 
            )
        } else {
            return (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {!loading && otherVideoDetails.map((video, index) => (
                <VideoPlayer key={index} video={video} />
              ))}
            </div>
            )
        }
    }else if (url.indexOf('profile') > 1) {
        if (!loading && videoDetails.length === 0){
        return (
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Upload to your portfolio</h2>
            </div> 
         )
        } else {
            return (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {!loading && videoDetails.map((video, index) => (
                <VideoPlayer key={index} video={video} />
              ))}
            </div>
            )
        }
    } 
  }
  

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto' }}>
    {loading && <div>Loading...</div>}
      {/* {videoDetails.length === 0 ?
        <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Upload to your portfolio</h2>
        </div> :
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {videoDetails.map((video, index) => (
            <VideoPlayer key={index} video={video} />
          ))}
        </div>

      } */}
      {render()}

    </div>
  )
}

export default Portfolio