import React from 'react';
import openSocket from 'socket.io-client';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './Components/Login';
import Header from './Components/Header';
import User from './Components/User';

import { history } from './Helpers/History';
import DashboardContainer from './Containers/Dashboard.container';
import PlaygroundContainer from './Containers/Playground.container';
import RegisterContainer from './Containers/Register.container';
import LogInContainer from './Containers/Login.container';

import { PrivateRoute, LoginRoute } from './Components/PrivateRoute';

function App() {
  // Khởi tạo history  
  return (
    <div>
      <Router history={history}>

        <Header></Header>

        <Switch>
          <LoginRoute path='/login' exact component={LogInContainer}></LoginRoute>
          <Route path='/register' exact component={RegisterContainer} />
          <PrivateRoute path="/dashboard" exact component={DashboardContainer}></PrivateRoute>
          <PrivateRoute path="/user" exact component={User}></PrivateRoute>          
          <Route path='/playground' exact component={PlaygroundContainer} />
          <Redirect to='/dashboard' />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
