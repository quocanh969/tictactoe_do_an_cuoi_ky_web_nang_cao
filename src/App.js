import React from 'react';
import openSocket from 'socket.io-client';

import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Header></Header>

      
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Redirect to='/dashboard'/>
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
