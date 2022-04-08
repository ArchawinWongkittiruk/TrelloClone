import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { getBoards } from '../../actions/board';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStore from '../../Store/withStore';

const Dashboard = withStore(['board', 'auth'], ({store, props}) => {
  const {state, dispatch} = store

  const { boards, loading } = state.boardState
  const { user, isAuthenticated } = state.authState
  if (!isAuthenticated) return <Redirect to='/' />

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Your Boards | TrelloClone';
  }, []);


  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
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
    </div>
  );
});

export default Dashboard;
