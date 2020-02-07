import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav class="nav">
      <Link to="/" className="navnav">
        Home
      </Link>
      <Link to="/articles" className="navnav">
        Articles
      </Link>
    </nav>
  );
};

export default Navbar;
