import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import FavouriteCard from "./favouriteCard";
import Axios from "axios";
import authService from '../../services/auth.service'
import authHeader from '../../services/auth-header';
import { Layout } from 'antd'
import { Content } from "antd/lib/layout/layout";

  const Button = styled.button`
  height: 30px;
  width: 40px;
`;

const FutureFilms = () => {
    const currentUser = authService.getCurrentUser();
    const [futureFilmsList, setFutureFilmsList] = useState([])

      useEffect(() => {
    Axios.post('http://localhost:8080/api/futureFilms/getFutureFilms', { data: currentUser.id }, { headers: authHeader() })
      .then(response => {
        if (response.data.success) {
          console.log('Users Future Films', response.data)
          setFutureFilmsList(response.data.films)
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
          } else {
            alert('Error')
          }
        })
  }

  return (
        <Layout>
          <Button onClick={onClickNotify}/>
            <Content>
                <div>
                    {futureFilmsList && futureFilmsList.map((films, index) => 
                        <FavouriteCard key={index} films={films}/>
                    )}
                </div>
            </Content>
        </Layout>
    )
}

export default FutureFilms