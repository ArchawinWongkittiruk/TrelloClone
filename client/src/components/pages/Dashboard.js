import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Dashboard = ({ auth: { user, isAuthenticated } }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    (async function getBoards() {
      setBoards((await axios.get('/api/boards')).data);
    })();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='dashboard'>
      <h1>Welcome {user && user.name}</h1>
      <h2>Your Boards</h2>
      <div className='boards'>
        {boards.map((board) => (
          <Link key={board._id} to='/board' className='board-card'>
            {board.title}
          </Link>
        ))}
        <button className='board-card create-board-card'>Create new board</button>
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
