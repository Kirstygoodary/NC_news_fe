import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <button className="filter-and_sort">Home</button>
      </Link>
      <Link to="/articles">
        <button className="filter-and_sort">Articles</button>
      </Link>
    </nav>
  );
};

export default Navbar;
