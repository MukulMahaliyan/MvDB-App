import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar"
 
const Navbar = React.memo(({onSearch}) => {
  console.log("inside Navbar ");
  return (
    <nav className='flex p-6 justify-around bg-violet-800'>
      <Link to="/">MvDb</Link>
      {/* <Menu></Menu> */}
      <SearchBar onSearch={onSearch} />
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/login">Log In</Link>

    </nav>
  );
}
);

export default Navbar;
