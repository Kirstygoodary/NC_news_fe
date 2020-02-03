import React from "react";
import { Link } from "@reach/router";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/articles">
        <button>Coding</button>
      </Link>
    </nav>
  );
};

export default Navbar;
