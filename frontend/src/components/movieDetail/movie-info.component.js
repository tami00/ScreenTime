// import React, { useState, useEffect } from "react";
// import { Container, Container2, ShowTimesContainer, PosterImg, InfoColumn, MovieName, MovieInfo, Button } from "./movie-info.styles";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import Reviews from "../review/reviews";
// import ShowTimes from "../showtimes/showtimes";
// import Axios from 'axios';
// import { getDetails } from "../../services/movieAPI.service";
// import FavouriteComp from "../favourites/favourite.component";
// import Films from "../films/films.component";
// import authHeader from '../../services/auth-header';
// import authService from '../../services/auth.service';
// import FutureFilmsComponent from "../films/FutureFilmsComponent";

// const MovieInfoComponent = () => {
//   const [movieInfo, setMovieInfo] = useState();
//   const [ReviewLists, setReviewLists] = useState([]);
//   const { id } = useParams()
//   const currentUser = authService.getCurrentUser();

//   const variable = {
//     //change userFrom
//     userFrom: currentUser.id,
//     movieId: movieInfo?.id,
//     movieTitle: movieInfo?.title,
//     movieImg: movieInfo?.poster_path,
//     movieDate: movieInfo?.release_date
//   }

// //   const AddButton = styled.button`
// //   height: 30px;
// //   width: 40px;
// // `;

// //   const onClick = () => {
// //     Axios.post('http://localhost:8080/api/futureFilms/addToFutureFilms', variable, { headers: authHeader() })
// //       .then(response => {
// //         if (response.data.success) {
// //           console.log("Added", response.data)
// //         } else {
// //           alert('Failed to add');
// //         }
// //       })
// //   }

//   useEffect(() => {

//     (async () => {
//       const response = await getDetails(id)
//       setMovieInfo(response)
//       //console.log(setMovieInfo);
//     })();

//   }, [])


//   const updateReview = (newReview) => {
//     setReviewLists(ReviewLists.concat(newReview))
//   }

//   return (
//     <Container>
//       <PosterImg src={`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`} />
//       <InfoColumn>
//         <MovieName>
//           {movieInfo?.title}
//         </MovieName>
//         <MovieInfo>
//           Release Date: {movieInfo?.release_date}
//         </MovieInfo>
//         <MovieInfo>
//           Average: {movieInfo?.vote_average}
//         </MovieInfo>
//         <MovieInfo>
//           Plot: {movieInfo?.overview}
//         </MovieInfo>
//       </InfoColumn>
//       <div>
//         {movieInfo !== undefined && <FavouriteComp movieInfo={movieInfo} />}
//       </div>
//       <div>
//       {movieInfo !== undefined && <FutureFilmsComponent movieInfo={movieInfo} />}
//       </div>
//       <div>
//         <Container2>
//           <Reviews movieInfo={movieInfo} refreshFunction={updateReview} movieId={movieInfo?.id} movieTitle={movieInfo?.title} />
//         </Container2>
//         {/* <ShowTimesContainer> 
//           <ShowTimes movieTitle={movieInfo?.title}/> 
//         </ShowTimesContainer> */}
//       </div>
//     </Container>
//   );
// };

// export default MovieInfoComponent

import React, {useState, useEffect } from "react";
import { Container, Container2, PosterImg, InfoColumn, MovieName, MovieInfo, Button } from "./movie-info.styles";
import { useParams } from "react-router-dom";
import Reviews from "../review/reviews";
import { getDetails } from "../../services/movieAPI.service";
import FavouriteComp from "../favourites/favourite.component";
import authHeader from '../../services/auth-header';
import Axios from 'axios';
import ShowTimes from "../showtimes/showtimes";

const MovieInfoComponent = () => {
    const [reviewList, setReviewList] = useState([]);
    const [movieInfo, setMovieInfo] = useState();
    const {id} = useParams()

    useEffect( ()=>{
   
      (async ()=>{
        const response = await getDetails(id)
        setMovieInfo(response)
        //console.log(setMovieInfo);
      })();
      
    },[])
      
    const updateReview = (newReview) => {
      setReviewList(reviewList.concat(newReview))
    }

    useEffect(() => {
      Axios.post('http://localhost:8080/api/review/getReviews', {data:id}, { headers: authHeader()})
            .then(response => {
                if (response.data.success) {
                    console.log('All Reviews',response.data.reviews)
                    setReviewList(response.data.reviews)
                } else {
                    alert('Error')
                }
            })
    }, [])

  
    return (
      <Container>
          <PosterImg src = {`https://image.tmdb.org/t/p/original/${movieInfo?.poster_path}`}/>
          <InfoColumn>
            <MovieName>
              {movieInfo?.title}
            </MovieName>
            <MovieInfo>
              Release Date: {movieInfo?.release_date}
            </MovieInfo>
            <MovieInfo>
              Average: {movieInfo?.vote_average}
            </MovieInfo>
            <MovieInfo>
              Plot: {movieInfo?.overview}
            </MovieInfo>
          </InfoColumn>
          <div>
          <FavouriteComp userFrom = {localStorage.getItem('userId')} movieInfo={movieInfo}/>
          </div>
          <div>
          <Container2>
            <ShowTimes></ShowTimes>
            <Reviews refreshFunction={updateReview} reviewList={reviewList} movieId={movieInfo?.id}/>
          </Container2>
          </div>
      </Container>
    );
  };

export default MovieInfoComponent
