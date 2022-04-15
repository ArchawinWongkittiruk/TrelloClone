import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthStore';

const Navbar = () => {
  const { auth: {isAuthenticated}, logout } = useContext(AuthContext);

  if (!isAuthenticated) return '';

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Home</Link>
      <Link to='/dashboard'>TrelloClone</Link>
      <Link to='/' onClick={() => logout()}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
