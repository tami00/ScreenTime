import React, {useState, useEffect } from "react";
import styled from "styled-components";
//services
import UserService from "../services/user.service";
import {displayMovies} from "../services/movie-details.service";

//components
import HeroImage from "./heroImage";

const Container = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const HomeComponent = () => {
  const [movieInfo, setMovieInfo] = useState();

  useEffect( ()=>{
   
    (async ()=>{
      const response = await displayMovies()
      setMovieInfo(response)
    })();
    
  },[])

  const firstMovie = (movieInfo?.results[0]);
  console.log(firstMovie)

  return (
    <>
      {firstMovie ?
        <HeroImage
          image={`https://image.tmdb.org/t/p/original/${firstMovie?.poster_path}`}
          title= {firstMovie.title}/> 
      : null
      }
      </>
  );
};

export default HomeComponent;



// export default class Home extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     content: ""
//   //   };
//   // }

//   // componentDidMount() {
//   //   UserService.getPublicContent().then(
//   //     response => {
//   //       this.setState({
//   //         content: response.data
//   //       });
//   //     },
//   //     error => {
//   //       this.setState({
//   //         content:
//   //           (error.response && error.response.data) ||
//   //           error.message ||
//   //           error.toString()
//   //       });
//   //     }
//   //   );
//   // }



//   // render() {
//   //   return (
//   //     <div className="container">
//   //         <heroImage/>
//   //     </div>
//   //   );
//   // }
// }
