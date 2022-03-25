import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';
// components
import Search from './components/search/Search'
import "./App.css";
// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import BoardAdmin from "./components/board-admin.component";
import BoardCreator from "./components/board-creator.component";
import BoardUser from "./components/board-user.component";
import Home from "./components/home.component";
import Login from "./components/login.component";
import MovieListComponent from "./components/films/movie-list.component";
import Profile from "./components/profile.component";
import Register from "./components/register.component";
import AuthService from "./services/auth.service";
import MovieInfoComponent from "./components/films/movie-info.component";
import MovieItem from "./components/films/movie-item.component";
import MovieDetailContainer from "./components/films/movie-detail-container.component"


const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly; ;
`;

const App = () => {
  const [showCreatorBoard, setShowCreatorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [locationState, setLocationState] = useState('')

  const location = useLocation();


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setLocationState(location.pathname)
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      this.logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);
  const logOut = () => {
    AuthService.logout();
    setShowCreatorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Movie App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showCreatorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>

        {/* passing a callback function to the Search component which will return
        the result returned from the api. Keeping the movie list state in app.js to map the movies here */}

        {locationState=='/register'||locationState=='/login'?null:<Search/>}


        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/films/:title/:id" children={<MovieInfoComponent/>}/>
          <Route exact path="/films/:title" children={<MovieListComponent/>}/>
          <Route path="/user" component={BoardUser} />
          <Route path="/creator" component={BoardCreator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
      {/* {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />} */}

      {/*<AuthVerify logOut={this.logOut}/> */}
    </div>
  );
};


export default App;