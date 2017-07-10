import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import App from '../components/app';
import Home from '../Auth/Home/Home';
import Callback from '../Auth/Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../Auth/history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </BrowserRouter>
  );
}