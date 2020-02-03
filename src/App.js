import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { Router } from "@reach/router";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Router>
        <Home path="/" />
      </Router>
    </div>
  );
}

export default App;
