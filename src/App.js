import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './layouts/landingPage/landingPage'
import Login from './layouts/login/login'
import SignupUser from './layouts/signupUser/signupUser'
import SignupCreator from './layouts/signupCreator/signupCreator'

import CreatorLobby from './layouts/creatorLobby/creatorLobby'
import UserLobby from './layouts/userLobby/UserLobby'

import Quizzler from './layouts/Quizzler/Quizzler'
import './App.css';

function App() {
  return (
    <HashRouter basename="/">
    <Switch>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/user-signup">
        <SignupUser/>
      </Route>
      <Route path="/creator-signup">
        <SignupCreator/>
      </Route>
      <Route path="/cl/:cid/:cname">
      {/* <Route exact path="/creator-dashboard/:creatorID"> */}
        <CreatorLobby/> 
      </Route>
      <Route path="/ul/:uid/:uname">
        <UserLobby/>
      </Route>
      <Route path="/q/:quizID/:uid/:uname">
        <Quizzler/>
      </Route>
    </Switch>
    </HashRouter>
  )
}

export default App;
