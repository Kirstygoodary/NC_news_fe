import React from "react";

const Header = props => {
  return (
    <div>
      <h1 className="Header">Welcome to The Good News.inc</h1>
      <h2 className="Header"> Celebrating all things good in the world!</h2>
      <p className="Header"> You are logged in as {props.username}</p>
    </div>
  );
};

export default Header;
