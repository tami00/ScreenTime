import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Typography, Table } from 'antd';
import ActivityVideoPlayer from './ActivityVideoPlayer';
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import SentimentComponent from '../sentiment-analysis/sentiment.component';

const { Title } = Typography;

function Activity(props) {
  const currentUser = authService.getCurrentUser();
  const [videoDetails, setVideoDetails] = useState([])
  const [follow, setFollowers] = useState([])
  const [loading, setLoading] = useState(true);

  const id = props.userID;

  useEffect(() => {
    setTimeout(() => {
      Axios.post("http://localhost:8080/api/getFollowers", {data: currentUser.id}, {
        headers: authHeader(),
      }).then((response) => {
        if (response.data.success) {
          // setFollowers(response.data.follow);
          console.log(response.data);
        } else {
          alert("Failed to get info");
        }
      });
    }, 200);
  }, []);



    useEffect(() => {
        Axios.post('http://localhost:8080/api/getFollowers', {data:id}, { headers: authHeader()})
              .then(response => {
                  if (response.data.success) {
                      // console.log('FOLLOWING VID',response.data.videos)
                      // setVideoDetails(response.data.videos)
                      // setTimeout(() => setLoading(false), 300);
                  } else {
                      alert('Error')
                  }
              })
      }, [])


  function render (){
        if (!loading && videoDetails.length === 0){
        return (
            <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
            <h2>No activity</h2>
            </div> 
         )
        } else {
            return (
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {videoDetails.map((video, index) => (
                <ActivityVideoPlayer key={index} video={video} />
              ))}
            </div>
            )
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

export default Activity