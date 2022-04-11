import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Menu, Container } from 'semantic-ui-react';
import SentimentComponent from "./sentiment-analysis/sentiment.component";

export default class Profile extends Component {
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

  state = { activeItem: 'films' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


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
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p> */}
        {/* <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p> */}
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      <Menu pointing secondary>
          <Menu.Item
            name='films'
            active={activeItem === 'films'}
            onClick={this.handleItemClick}
          />
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
        {activeItem === 'reviews' ? <SentimentComponent/>
        : "You haven't created an reviews yet"}
      </div>
    );
  }
}
