import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import AllArticles from "./components/AllArticles/AllArticles";
import ArticlesById from "./components/ArticlesById/ArticlesById";
import ViewComments from "./components/ViewComments/ViewComments";
import { Router } from "@reach/router";
import AddComment from "./components/AddComment/AddComment";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Router>
        <Home path="/" />
        <AllArticles path="/articles" />
        <ArticlesById path="/articles/:id"></ArticlesById>
        <ViewComments path="/articles/:id/comments"></ViewComments>
        {/* <AddComment path="/articles/:id/comments"></AddComment> */}
      </Router>
    </div>
  );
}

export default App;
