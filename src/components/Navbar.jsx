import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar"
import AuthContext from '../AuthContext';
 
const Navbar = ({onSearch}) => {
  console.log("inside Navbar ");
  const { user, logout} = useContext(AuthContext);

  const handleLogout = (e)=>{
    e.preventDefault();
    logout();
  }
  
  return (
    <nav className='flex p-6 justify-around bg-violet-800'>
      <Link to="/">MvDb</Link>
      {/* <Menu></Menu> */}
      <SearchBar onSearch={onSearch} />
      <Link to="/watchlist">Watchlist</Link>
      {!user && <Link to="/login">Log In</Link> } 
      { user && <button onClick={handleLogout}>Log Out</button>}

    </nav>
  );
};

export default Navbar;
