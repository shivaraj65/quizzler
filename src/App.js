import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './layouts/landingPage/landingPage'
import Login from './layouts/login/login'
import SignupUser from './layouts/signupUser/signupUser'
import SignupCreator from './layouts/signupCreator/signupCreator'

import CreatorLobby from './layouts/creatorLobby/creatorLobby'
import './App.css';

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route exact path="/login">
        <Login/>
      </Route>
      <Route exact path="/user-signup">
        <SignupUser/>
      </Route>
      <Route exact path="/creator-signup">
        <SignupCreator/>
      </Route>
      <Route exact path="/creator-dashboard">
      {/* <Route exact path="/creator-dashboard/:creatorID"> */}
        <CreatorLobby/> 
      </Route>
    </Switch>
    </Router>
  )
}

export default App;
