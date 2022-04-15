import React, { Fragment, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BoardStore from './contexts/BoardStore';
import {AuthContext} from './contexts/AuthStore';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Board from './components/pages/Board';
import Alert from './components/other/Alert';

import './App.css';



export default function App() {

  const {loadUser} = useContext(AuthContext)
    useEffect(() => {
        loadUser();
    }, [loadUser]);
  return (
      <Router>
        <Fragment>
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
              <BoardStore>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/board/:id' component={Board} />
              </BoardStore>
          </Switch>
        </Fragment>
      </Router>
  )
}
