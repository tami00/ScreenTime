import React, {useState, useEffect} from 'react'
import Axios from "axios";
import ReactPlayer from 'react-player'
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";

function VideoPlayer(props) {
  const currentUser = authService.getCurrentUser();
  const { filePath,title, description } = props.video;
  const [videoUrl, setVideoUrl] = useState('');
  console.log(props);

  console.log('CURRENT ',currentUser.id)

  useEffect(() => {
    const newFilePath = filePath.replace('//', '/');
    console.log(newFilePath);
    setVideoUrl('http://localhost:8080/' + newFilePath);
  }, []);

  const onClick = (e) =>{
    e.preventDefault();

    Axios.post(
      "http://localhost:8080/api/portfolio/deleteVideo",{ data: currentUser.id },{ headers: authHeader() }
    ).then((response) => {
      if (response.data.success) {
        console.log("Removed from portfolio");
      } else {
        alert("Failed to remove");
      }
    });
  }

  return (
    <div style = {{backgroundColor:'white'}}>
    <div className="player-wrapper">
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactPlayer
        className="react-player "
        url={videoUrl}
        width="50%"
        height="50%"
        controls={true}
      />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onClick}>DELETE</button> 
    </div>
    </div>
  )
}


export default VideoPlayer
