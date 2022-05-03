import Axios from 'axios';
import React, {Component, useState, useEffect } from 'react'
import authHeader from '../../services/auth-header';
import AuthService from '../../services/auth.service';
import { Menu } from 'semantic-ui-react';
import styled from "styled-components";
import FutureFilms from './futureFilms';
import FavouriteContainer from './favouriteContainer';


export default class Films extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  state = { activeItem: 'watchlist' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderSwitch(activeItem) {
    switch(activeItem) {
      case 'favourites':
        return <FavouriteContainer/>;
      case 'futurefilms':
        return <FutureFilms/>;
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div><Menu pointing secondary>
          <Menu.Item
            name='favourites'
            active={activeItem === 'favourites'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='futurefilms'
            active={activeItem === 'futurefilms'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    )
  }
}


// function Films(props) {

//   const currentUser = authService.getCurrentUser();

//   const state = useState('')

//   const [futureFilmsList, setFutureFilmsList] =  useState([]);
//   // const handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   const Button = styled.button`
//   height: 30px;
//   width: 40px;
// `;


//   const onClickFutureFilms = () => {
    // Axios.post('http://localhost:8080/api/futureFilms/getFutureFilms', { data: currentUser.id }, { headers: authHeader() })
    //   .then(response => {
    //     if (response.data.success) {
    //       console.log('Users Future Films', response.data)
    //       setFutureFilmsList(response.data.films)
    //     } else {
    //       alert('Error')
    //     }
//       })
//   }

//   const onClickFavourites = () => {
//     Axios.post('http://localhost:8080/api/favourite/getFavourites', { data: currentUser.id }, { headers: authHeader() })
//       .then(response => {
//         if (response.data.success) {
//           console.log('Users Favourite Films', response.data)
//           // setFutureFilmsList(response.data.films)
//         } else {
//           alert('Error')
//         }
//       })
//   }

//   const onClickNotify = () => {
//       Axios.post('http://localhost:8080/api/watchlist/notifications', { data: futureFilmsList }, { headers: authHeader() })
//         .then(response => {
//           if (response.data.success) {
//             console.log('Sent successfully');
//           } else {
//             alert('Error')
//           }
//         })
//   }

//   const onClick = () => {
//     const res = futureFilmsList[0].userFrom
//     console.log(res)
//   }


//   return (
//     <div>
//       <Menu mode="horizontal" defaultSelectedKeys={['watchlist']}>
//         <Menu.Item key="watchlist" onClick={onClickFavourites}>
//           Watchlist
//         </Menu.Item>
//         <Menu.Item key="futureFilms" onClick={onClickFutureFilms}>
//           Future Films
//           <Button onClick={onClickNotify}/>
//         </Menu.Item>
//       </Menu>
//     </div>
//   )
// }

// export default Films;