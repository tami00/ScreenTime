import React, {useState, useEffect } from "react";
//services
import {getPopularMovies, getUpcoming} from "../services/movieAPI.service";

//styles
import { Carousel } from 'antd';
//components
import HeroImage from "./heroImage";
import Rows from "./rows";
import Poster from "./poster";
import { useHistory } from "react-router-dom";// services

const HomeComponent = () => {
  const [popularMovieInfo, setPopularMovieInfo] = useState();
  const [upMovieInfo, setUpMovieInfo] = useState();
  const [loading, setLoading] = useState(true);

  useEffect( ()=>{
   
    (async ()=>{
      const response = await getPopularMovies()
      setPopularMovieInfo(response)
      setTimeout(() => setLoading(false), 300);
    })();
    
  },[])

  useEffect( ()=>{
   
    (async ()=>{
      const response = await getUpcoming()
      setUpMovieInfo(response)
      setTimeout(() => setLoading(false), 300);
    })();
    
  },[])

  const firstMovie = (popularMovieInfo?.results[0]);
  console.log(firstMovie)

  return (
    <> {loading && <div>Loading...</div>}
      {!loading && firstMovie ?
        <HeroImage
          image={`https://image.tmdb.org/t/p/original/${firstMovie.backdrop_path}`}
          title= {firstMovie.title}/> 
      : null
      }

      {!loading ? 
      <Rows header = 'Popular'>
        {popularMovieInfo?.results.map(popularMovieInfo => (
          <Poster
            key={popularMovieInfo.id}
            image={popularMovieInfo.poster_path
              ? `https://image.tmdb.org/t/p/w1280/${popularMovieInfo.poster_path}`
              : 'No image'
            }
            movieId={popularMovieInfo.id}
            movieTitle={popularMovieInfo.title}
            />
        ))}
      </Rows>
      : <div>Loading</div>}

{!loading ? 
      <Rows header = 'Upcoming'>
        {!loading && upMovieInfo?.results.map(upMovieInfo => (
          <Poster
            key={upMovieInfo.id}
            image={upMovieInfo.poster_path
              ? `https://image.tmdb.org/t/p/w1280/${upMovieInfo.poster_path}`
              : 'No image'
            }
            movieId={upMovieInfo.id}
            />
        ))}
      </Rows>
      : <div>Loading</div>}
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
