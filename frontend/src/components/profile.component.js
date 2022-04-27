import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import { Menu } from 'semantic-ui-react';
import SentimentComponent from "./sentiment-analysis/sentiment.component";
import Films from "./films/films.component"
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

  renderSwitch(activeItem) {
    switch(activeItem) {
      case 'reviews':
        return <SentimentComponent/>;
      case 'films':
        return <Films/>;
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
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Username: </strong>
        {currentUser.username}
        <p>
          <strong>Phone Number: </strong>
          {currentUser.phoneNo}
        </p>
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
        {this.renderSwitch(activeItem)}
      </div>
    );
  }
}
