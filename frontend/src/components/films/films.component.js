import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import authHeader from '../../services/auth-header';
import authService from '../../services/auth.service';
import { Menu } from 'antd';
import styled from "styled-components";
import FutureFilms from './futureFilms';

function Films(props) {

  const currentUser = authService.getCurrentUser();

  const state = useState('')

  const [futureFilmsList, setFutureFilmsList] =  useState([]);
  // const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  const Button = styled.button`
  height: 30px;
  width: 40px;
`;


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
  }, [])

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

  const onClick = () => {
    const res = futureFilmsList[0].userFrom
    console.log(res)
  }


  return (
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={['watchlist']}>
        <Menu.Item key="watchlist">
          Watchlist
        </Menu.Item>
        <Menu.Item>
          Future Films
          <Button onClick={onClickNotify}/>
        </Menu.Item>
      </Menu>
    </div>
  )
}

export default Films;