import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import { videoPlayerStyle } from './videoPlayer.styles';

function VideoPlayer(props) {
  const { filePath,title, description } = props.video;
  const [videoUrl, setVideoUrl] = useState('');
  console.log(props);

  useEffect(() => {
    const newFilePath = filePath.replace('//', '/');
    console.log(newFilePath);
    setVideoUrl('http://localhost:8080/' + newFilePath);
  }, []);

  return (
    <div style = {{backgroundColor:'blue'}}>
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
    </div>
    </div>
  )
}


export default VideoPlayer
