import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getBoards } from '../../actions/board';
import CreateBoard from '../subcomponents/CreateBoard';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dashboard = ({ auth: { user, isAuthenticated }, boards, getBoards, loading }) => {
  useEffect(() => {
    getBoards();
  }, [getBoards]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <section className='dashboard'>
      <h1>Welcome {user && user.name}</h1>
      <h2>Your Boards</h2>
      {loading && <CircularProgress className='dashboard-loading' />}
      <div className='boards'>
        {boards.map((board) => (
          <Link key={board._id} to={`/board/${board._id}`} className='board-card'>
            {board.title}
          </Link>
        ))}
        <CreateBoard />
      </div>
    </section>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  boards: PropTypes.array,
  getBoards: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  boards: state.board.boards,
  loading: state.board.loading,
});

export default connect(mapStateToProps, { getBoards })(Dashboard);
