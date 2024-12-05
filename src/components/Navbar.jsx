import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar"
 
const Navbar = React.memo(({onSearch}) => {
  console.log("inside Navbar ");
  return (
    <nav>
      <Link to="/">MvDb</Link>
      {/* <Menu></Menu> */}
      <SearchBar onSearch={onSearch} />
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/signin">Sign In</Link>

    </nav>
  );
}
);

export default Navbar;
