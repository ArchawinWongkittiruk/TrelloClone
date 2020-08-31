import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';

const Landing = () => {
  return (
    <Fragment>
      <section className='landing'>
        <nav className='navbar'>
          <h2>TrelloClone</h2>
          <div>
            <Button color='inherit'>Login</Button>
            <Button variant='contained'>Sign Up</Button>
          </div>
        </nav>
        <div className='landing-inner'>
          <h1>TrelloClone</h1>
          <p>
            Just like <a href='https://trello.com/'>Trello</a>, but made by an amateur!
          </p>
          <div className='buttons'>
            <Button variant='outlined' color='inherit'>
              Sign Up
            </Button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Landing;
