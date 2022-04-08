import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import withStore from '../../Store/withStore';

const Navbar = withStore(['auth'],({store}) => {
  const {state, dispatch} = store
  
  const isAuthenticated = state.authState.isAuthenticated
  if (!isAuthenticated) return ''

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>TrelloClone</Link>
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
});

export default Navbar;
