import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Menu, Dropdown } from 'semantic-ui-react';
import SentimentComponent from "../sentiment-analysis/sentiment.component";
import Films from "../films/films.component"
import Portfolio from "../portfolio/Portfolio"
import FutureFilms from '../films/FutureFilmsComponent';
import FavouriteContainer from '../films/favouriteContainer';
import { Avatar } from 'antd';
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
      userReady: false,
      userDetails: []
    };
  }

  componentDidMount() {
    const id = this.props.id;

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

    if (!id) this.setState({ redirect: "/home" });
    this.setState({userReady: true })
  }

  renderSwitch(activeItem){
    switch (activeItem) {
      case 'reviews':
        return <SentimentComponent />;
      case 'films':
        return <Films />;
      case 'portfolio':
        return <Portfolio />;
      case 'favourites':
        return <FavouriteContainer userID={this.state.userDetails._id}/>;
      case 'futurefilms':
        return <FutureFilms />;
    }
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { activeItem } = this.state;
    const { userDetails } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <br></br>
            <Avatar size={180} icon={<UserOutlined />}/>
            <br></br>
              <br></br>
            <strong>Username: </strong>
            {userDetails.username}
            <p>
              <strong>Bio: </strong>
              {userDetails.bio}
            </p>
            {/* <button onClick={this.onClick}> EDIT </button> */}
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
          <Menu.Item
            name='campaign'
            active={activeItem === 'campaign'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
