import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>WebAppKanban</Link>
      <Link to='/' onClick={() => dispatch(logout())}>
        Sair
      </Link>
    </nav>
  );
};

export default Navbar;
