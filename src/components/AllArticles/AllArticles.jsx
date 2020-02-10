import React from "react";
import axios from "axios";
import * as api from "../API/api";
import { Link } from "@reach/router";
import ErrorPage from "../ErrorPage";
import "../AllArticles/AllArticles.css";
import ArticlesById from "../ArticlesById/ArticlesById";

class AllArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    searchTerm: "",
    filterTerm: "",
    error: null
  };

  render() {
    const { articles, isLoading, error } = this.state;
    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else if (isLoading) return <p>Loading...</p>;
    else {
      return (
        <div>
          <form>
            Filter By:{" "}
            <label>
              <button value="cooking" onClick={this.handleClick}>
                Cooking
              </button>
              <br />
              <button value="coding" onClick={this.handleClick}>
                Coding
              </button>
              <br />
              <button value="football" onClick={this.handleClick}>
                Football
              </button>
            </label>
          </form>
          <form>
            Sort By:{" "}
            <label className="filter_and_sort">
              {" "}
              <button value="created_at" onClick={this.handleFilter}>
                Date
              </button>
              <br />
              <button value="comment_count" onClick={this.handleFilter}>
                Comment count
              </button>
              <br />
              <button value="votes" onClick={this.handleFilter}>
                Votes
              </button>
            </label>
          </form>
          <ul>
            <div className="container grid-wrapper">
              {articles.map(article => {
                return (
                  <div className="box zone" key={article.article_id}>
                    <li className="Header" className="articles">
                      <div className="title">
                        <strong>{article.title}</strong>
                      </div>
                      <br />
                      <div className="articlebody">
                        <em>{article.body.slice(0, 100) + "..."}</em> <br />
                        date: {article.created_at} <br />
                        comment count: {article.comment_count} <br />
                        votes: {article.votes}
                      </div>
                      <Link to={`/articles/${article.article_id}`}>
                        <button>--></button>
                      </Link>
                    </li>
                  </div>
                );
              })}
            </div>
          </ul>
          <ArticlesById username={this.props.username} />
        </div>
      );
    }
  }

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchTerm, filterTerm } = this.state;
    if (searchTerm !== prevState.searchTerm) {
      this.fetchArticles();

      // axios
      //   .get(
      //     `https://kirsty-g-nc-news.herokuapp.com/api/articles?topic=${searchTerm}`
      //   )
      //   .then(({ data }) => {
      //     this.setState({
      //       articles: data.articles
      //     });
      //   })
      //   .catch(err => {
      //     this.setState({ error: err });
      //   });
    } else if (filterTerm !== prevState.filterTerm) {
      this.fetchArticles();

      // axios
      //   .get(
      //     `https://kirsty-g-nc-news.herokuapp.com/api/articles?sort_by=${filterTerm}`
      //   )
      //   .then(({ data }) => {
      //     this.setState({
      //       articles: data.articles
      //     });
      //   })
      //   .catch(err => {
      //     this.setState({ error: err });
      //   });
    }
  }

  fetchArticles = () => {
    const { searchTerm, filterTerm } = this.state;
    api
      .getArticles(this.searchTerm, this.filterTerm)
      .then(articles => {
        this.setState({
          articles: articles,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err, "error");
        this.setState({ error: err });
      });
  };

  handleClick = event => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  };

  handleFilter = event => {
    event.preventDefault();
    this.setState({ filterTerm: event.target.value });
  };
}

export default AllArticles;
