import React from 'react';
import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

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
          Just like <a href='https://trello.com/'>Trello</a>, but made by an amateur!
        </p>
        <div className='buttons'>
          <Button variant='outlined' color='inherit' href='/register'>
            Sign Up
          </Button>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
