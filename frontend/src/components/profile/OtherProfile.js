import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Dropdown } from 'semantic-ui-react';
import SentimentComponent from "../sentiment-analysis/sentiment.component";
import Films from "../films/films.component"
import AuthService from "../../services/auth.service";
import Portfolio from "../portfolio/Portfolio"
import FutureFilms from '../films/futureFilms';
import FavouriteContainer from '../films/favouriteContainer';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from "react-router";
import Axios from "axios";
import authHeader from '../../services/auth-header';

export default class OtherProfile extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.id)

    this.state = {
      redirect: null,
      activeItem: 'favourites',
      currentUser: { username: "" },
      userReady: false,
      userDetails: [],
      following: true
    };
  }

  componentDidMount() {
    const id = this.props.id;
    const currentUser = AuthService.getCurrentUser();
    this.setState({currentUser: currentUser})

    Axios.get(`http://localhost:8080/api/getUserDetails/?id=${id}`)
    .then(response => {
        if (response.data.success) {
            // console.log('Users Details', response.data)
            this.setState({ userDetails: response.data.details })
        } else {
            alert('Error')
        }
    })
    

    // console.log('OU ID',this.state.userDetails._id)

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }


  renderSwitch(activeItem){
    switch (activeItem) {
      case 'reviews':
        return <SentimentComponent userID={this.state.userDetails._id}/>;
      case 'films':
        return <Films />;
      case 'portfolio':
        return <Portfolio userID={this.state.userDetails._id}/>;
      case 'favourites':
        return <FavouriteContainer userID={this.state.userDetails._id}/>;
      case 'futurefilms':
        return <FutureFilms userID={this.state.userDetails._id}/>;
    }
  }



  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { activeItem } = this.state;
    const { userDetails } = this.state;
    const { currentUser } = this.state;
    const { following } = this.state;

    const followUser = () => {
        
        const currentID = currentUser.id;
        const id = this.props.id;
        
        console.log('CURRENT ID',currentID)
        console.log('otherUserID',id)
    
        Axios.put(`http://localhost:8080/api/follow/?id=${id}`,  { data: currentID }, { headers: authHeader() })
        .then(response => {
            if (response.data) {
                console.log('FOLLOWED', response.data)
                // this.setState({ userDetails: response.data.details })
            } else {
               console.log(response)
            }
        })

    }

    const unfollowUser = () => {
        
      const currentID = currentUser.id;
      const id = this.props.id;
      
      console.log('CURRENT ID',currentID)
      console.log('otherUserID',id)

      Axios.put(`http://localhost:8080/api/unfollow/?id=${id}`,  { data: currentID }, { headers: authHeader() })
      .then(response => {
        this.setState({following: false})
        console.log('UNFOLLOWED', response.data)
      })

  }


    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <br></br>
            {userDetails.filePath ? (
              <img
                height={180}
                width={180}
                src={
                  "http://localhost:8080/" +
                  userDetails.filePath.split("\\").join("/")
                }
                style={{ borderRadius: "50%" }}
              ></img>
            ) : (
              <Avatar size={180} icon={<UserOutlined />} />
            )}
            <br></br>
              <br></br>
            <strong>Username: </strong>
            {userDetails.username}
            <p>
              <strong>Bio: </strong>
              {userDetails.bio}
            </p>
            <Button onClick={followUser}> Follow </Button>
            <Button onClick={unfollowUser}> Unfollow </Button>

          </div> : null}
        <Menu>
          <Dropdown
            item text='Films'
            name='films'>
            <Dropdown.Menu>
            <Dropdown.Item
                name="favourites"
                active={activeItem === 'favourites'}
                onClick={this.handleItemClick}>
                Favourites
              </Dropdown.Item>
              <Dropdown.Item
                name="futurefilms"
                active={activeItem === 'futurefilms'}
                onClick={this.handleItemClick}>
                Future Films
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            name='reviews'
            active={activeItem === 'reviews'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='portfolio'
            active={activeItem === 'portfolio'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
