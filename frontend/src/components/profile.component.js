import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Menu, Dropdown } from 'semantic-ui-react';
import SentimentComponent from "./sentiment-analysis/sentiment.component";
import Films from "./films/films.component"
import Portfolio from "../components/portfolio/Portfolio"
import FutureFilms from '../components/films/futureFilms';
import FavouriteContainer from '../components/films/favouriteContainer';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Activity from './activity/Activity'
import ReccomendedMovies from './recommender/recommdender'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      activeItem: 'favourites'
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onClick = (e) => {
    this.props.history.push("/profile/edit");
  }

  renderSwitch(activeItem) {
    switch (activeItem) {
      case 'reviews':
        return <SentimentComponent />;
      case 'films':
        return <Films />;
      case 'portfolio':
        return <Portfolio />;
      case 'favourites':
        return <FavouriteContainer />;
      case 'futurefilms':
        return <FutureFilms />;
        case 'activity':
          return <Activity/>;
          case 'recommendations':
          return <ReccomendedMovies/>;
    }
  }


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;
    const { activeItem } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
          <div>
            <br></br>

            {currentUser.filePath ? (
              <img
                height={180}
                width={180}
                src={currentUser.filePath.split("\\").join("/")}
              ></img>
            ) : (
              <Avatar size={180} icon={<UserOutlined />} />
            )}


            <p>
              <strong>Email:</strong>{" "}
              {currentUser.email}
            </p>
            <strong>Username: </strong>
            {currentUser.username}
            <p>
              <button onClick={this.onClick}> EDIT </button>
              {/* <strong>Phone Number: </strong>
              {currentUser.phoneNo} */}
            </p>
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
            name='activity'
            active={activeItem === 'activity'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='recommendations'
            active={activeItem === 'recommendations'}
            onClick={this.handleItemClick}
          />
        </Menu>
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
