import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import withStore from '../../Store/withStore';

const Landing = withStore(['auth'], ({store, props}) => {
  const {state} = store

  const isAuthenticated = state.authState.isAuthenticated
  if (isAuthenticated) return <Redirect to='/dashboard' />;

  useEffect(() => {
    document.title = 'TrelloClone';
  }, []);


  return (
    <section className='landing'>
      <nav className='top'>
        <h2>TrelloClone</h2>
        <div>
          <Button color='inherit' href='/login'>
            Login
          </Button>
          <Button variant='contained' href='/register'>
            Sign Up
          </Button>
        </div>
      </nav>
      <div className='landing-inner'>
        <h1>TrelloClone</h1>
        <p>
          Just like <a href='https://trello.com/'>Trello</a>, but made by just one guy!
        </p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
});

export default Landing;
