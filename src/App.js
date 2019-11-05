import React from 'react';


import { Router, Switch, Route, Redirect } from 'react-router-dom';


import { history } from './Helpers/History';
import DashboardContainer from './Containers/Dashboard.container';
import PlaygroundContainer from './Containers/Playground.container';
import RegisterContainer from './Containers/Register.container';
import LogInContainer from './Containers/Login.container';

import { PrivateRoute, LoginRoute } from './Components/PrivateRoute';
import HeaderContainer from './Containers/Header.container';
import UserContainer from './Containers/User.container';

function App() {
  // Khởi tạo history  
  return (
    <div>
      <Router history={history}>

        <HeaderContainer></HeaderContainer>

        <Switch>
          <LoginRoute path='/login' exact component={LogInContainer}></LoginRoute>
          <LoginRoute path='/register' exact component={RegisterContainer}></LoginRoute>
          <PrivateRoute path="/dashboard" exact component={DashboardContainer}></PrivateRoute>
          <PrivateRoute path="/user" exact component={UserContainer}></PrivateRoute>          
          <PrivateRoute path='/playground' exact component={PlaygroundContainer}></PrivateRoute>
          <Redirect to='/dashboard' />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
