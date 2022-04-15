import React, { useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';
import { BoardContext } from '../../contexts/BoardStore';
import CreateBoard from '../other/CreateBoard';
import Navbar from '../other/Navbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dashboard = () => {
  const { auth: {isAuthenticated, user}, loadUser } = useContext(AuthContext);
  const { board: {boards, dashboardLoading}, getBoards } = useContext(BoardContext);

  useEffect(() => {
    loadUser() // For some reason, if a user logs out and then logs in, the app doesn't recognize the token in localStorage. Having loadUser both here and in App.js fixes it.
    getBoards();
  }, [getBoards, loadUser]);

  useEffect(() => {
    document.title = 'Your Boards | TrelloClone';
  }, []);

  if (!isAuthenticated) return <Redirect to='/' />;

  return (
    <div className='dashboard-and-navbar'>
      <Navbar />
      <section className='dashboard'>
        <h1>Welcome {user?.name}</h1>
        <h2>Your Boards</h2>
        {dashboardLoading && <CircularProgress className='dashboard-loading' />}
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
  )
};

export default Dashboard;
