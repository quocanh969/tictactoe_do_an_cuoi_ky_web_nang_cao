import React from 'react';
import openSocket from 'socket.io-client';

import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Header from './Components/Header';
import User from './Components/User';
import Playground from './Components/Playground';
import Register from './Components/Register';


function App() {

  return (
    <div>
      <BrowserRouter>

        <Header></Header>

        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/user' exact component={User} />
          <Route path='/playground' exact component={Playground} />
          <Redirect to='/dashboard'/>
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
