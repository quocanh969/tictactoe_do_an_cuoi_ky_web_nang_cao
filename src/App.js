import React from 'react';
import openSocket from 'socket.io-client';

import {BrowserRouter,Switch, Route, Redirect} from 'react-router-dom';

import Login from './Components/Login';
import Menu from './Components/Menu';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/menu' exact component={Menu} />
          <Redirect to='/login'/>
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
