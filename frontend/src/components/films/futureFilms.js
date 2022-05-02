import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FavouriteCard from "./favouriteCard";
import Axios from "axios";
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import { Col, Row  } from 'antd'

  const Button = styled.button`
  height: 30px;
  width: 40px;
`;

const FutureFilms = (props) => {
    const currentUser = authService.getCurrentUser();
    const [futureFilmsList, setFutureFilmsList] = useState([])
    const [otherFutureFilmsList, setOtherFutureFilmsList] = useState([])
    const [visible, setVisible] = useState(3)
    const [loading, setLoading] = useState(true);

    const id = props.userID;

    const url = window.location.href 

    const handleChange = (value) => {
      setVisible((prevValue) => prevValue + 3)
   }

      useEffect(() => {
    Axios.post('http://localhost:8080/api/futureFilms/getFutureFilms', { data: currentUser.id }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          console.log('Users Future Films', response.data)
          setFutureFilmsList(response.data.films)
          setTimeout(() => setLoading(false), 300);
        } else {
          alert('Error')
        }
      })
  },[])

  useEffect(() => {
    Axios.post('http://localhost:8080/api/futureFilms/getOtherFutureFilms', { data: id }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          console.log('Other Users Future Films', response.data)
          setOtherFutureFilmsList(response.data.films)
          setTimeout(() => setLoading(false), 300);
        } else {
          alert('Error')
        }
      })
  },[])

    const onClickNotify = () => {
      Axios.post('http://localhost:8080/api/watchlist/notifications', { data: futureFilmsList }, { headers: authHeader() })
        .then(response => {
          if (response.data.success) {
            console.log('Sent successfully');
            setTimeout(() => setLoading(false), 300);
          } else {
            alert('Error')
          }
        })
  }

  const displayCards = !loading && futureFilmsList && futureFilmsList.slice(0, visible).map((films, index) => {
    return (
    <Col lg={6} md={8} xs={24}>
    <FavouriteCard key={index} films={films}/>
    </Col>
    )
})

const otherUserDisplayCards = !loading && otherFutureFilmsList && otherFutureFilmsList.slice(0, visible).map((films, index) => {
  return (
  <Col lg={6} md={8} xs={24}>
  <FavouriteCard key={index} films={films}/>
  </Col>
  )
})

function render (){
  if(url.indexOf(id) > 1) {
      if(!loading && otherFutureFilmsList.length === 0){
          return (
             <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
              <h2>User does not have any films added</h2>
             </div> 
          )
      } else {
          return (
          <div>
          <Row gutter={[16, 16]}>
          {otherUserDisplayCards} 
          </Row>
          <button onClick={handleChange}>Load</button>
          </div>
          )
      }
  }else if (url.indexOf('profile') > 1) {
      if (!loading && futureFilmsList.length === 0){
      return (
          <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
           <h2>Add movies to your watchlist</h2>
          </div> 
       )
      } else {
          return (
          <div>
             <Button onClick={onClickNotify}/>
              <Row gutter={[16, 16]}>
              {displayCards} 
              </Row>
              {visible > 3 ?
         <button onClick={handleChange}>Load</button>
        : ''}
              </div>
          )
      }
  } 
}

  return (
    <div style={{ maxWidth: '2000px', margin: '2rem auto' }}>    
    {loading && <div>Loading...</div>}         
        {render()}
    </div>
  )
}

export default FutureFilms