import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AllArticles from "./components/AllArticles/AllArticles";
import ArticlesById from "./components/ArticlesById/ArticlesById";
import ViewComments from "./components/ViewComments/ViewComments";

import { Router } from "@reach/router";

class App extends React.Component {
  state = {
    username: "jessjelly"
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Navbar />
        <Router>
          <Home path="/" />
          <AllArticles username={this.state.username} path="/articles" />
          <ArticlesById path="/articles/:id" username={this.state.username} />
          <ViewComments path="/articles/:id/comments" />
        </Router>
      </div>
    );
  }
}

export default App;
