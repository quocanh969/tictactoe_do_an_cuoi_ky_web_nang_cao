import React from 'react';
import openSocket from 'socket.io-client';

import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Login from './Components/Login';
import Header from './Components/Header';
import User from './Components/User';
import Register from './Components/Register';

import { history } from './Helpers/History';
import DashboardContainer from './Containers/Dashboard.container';
import PlaygroundContainer from './Containers/Playground.container';

function App() {
  // Khởi tạo history  
  return (
    <div>
      <Router history={history}>

        <Header></Header>

        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/dashboard' exact component={DashboardContainer} />
          <Route path='/user' exact component={User} />
          <Route path='/playground' exact component={PlaygroundContainer} />
          <Redirect to='/dashboard' />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
