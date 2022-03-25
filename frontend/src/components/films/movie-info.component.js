import axios from "axios";
import React, {useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Reviews from "./reviews";
import { getDetails } from "../../services/movie-details.service";
import { trailer } from "../../services/search.service";
import { BiLoaderAlt } from "react-icons/bi";
import {IoCloseOutline} from "react-icons/io5";
import FavouriteComp from "./favourite.component";

const Container = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;

const Container2 = styled.div`
  position: absolute;
  botton: 0;
  z-index: 1;
  left: 0; right: 0; bottom: 0;
  background: #808080;
  padding: 3px 8px;
  border-top: 1px solid lightgray;
  color: #fff;
`;

const PosterImg = styled.img`
  object-fit: cover;
  height: 352px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const MovieName = styled.span`
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin: 15px 0;
    white-space: nowrap;
    overflow: hidden;
    text-transform: capitalize;
    text-overflow: ellipsis;
    & span {
    opacity: 0.8;
}
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;

const FavouriteButton = styled.button`
  height: 30px;
  width: 40px;
`;

const MovieInfoComponent = () => {
    const link = "https://www.youtube.com/embed/{4UZrsTqkcW4}"
    const[trailerDetails, setTrailerDetails] = useState();
    const [movieInfo, setMovieInfo] = useState();
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const {id} = useParams()
    //console.log(id)

    useEffect( ()=>{
   
      (async ()=>{
        const response = await getDetails(id)
        setMovieInfo(response)
        //console.log(setMovieInfo);
      })();
      
    },[])

  // const getTrailer = () =>{
      
    useEffect(() => {
      console.log(trailerDetails?.results)
    }, [trailerDetails]);

    const handleClick = async () => {
      const res =  await trailer(id);
      setTrailerDetails(res);
    }

    const openModal = () => {
      setModal(!modal);
    };

    const spinner = () => {
      setVideoLoading(!videoLoading);
    };


  // }

    // useEffect (() =>{
    //   (async ()=>{
    //     const response = await trailer(id)
    //     setTrailerDetails(response)
    //   })();
    // },[])
  
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
          <Button onClick={openModal}>Play
            {
              modal ? (
                <section className="modal__bg">
                  <div className="modal__align">
                    <div className="modal__content" modal={modal}>
                      <IoCloseOutline
                        className="modal__close"
                        arial-label="Close modal"
                        onClick={setModal}
                      />
                      <div className="modal__video-align">
                        {videoLoading ? (
                          <div className="modal__spinner">
                            <BiLoaderAlt
                              className="modal__spinner-style"
                              fadeIn="none"
                            />
                          </div>
                        ) : null}
                        <iframe
                          className="modal__video-style"
                          onLoad={spinner}
                          loading="lazy"
                          width="800"
                          height="500"
                          src="https://www.youtube.com/embed/jK2VROKKTSQ"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}
          </Button>
          <div>
          <FavouriteComp userFrom = {localStorage.getItem('userId')} movieInfo={movieInfo}/>
          </div>
          <div>
          <Container2>
            <Reviews movieInfo = {movieInfo}/>
          </Container2>
          </div>
      </Container>
    );
  };

export default MovieInfoComponent
