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
            <label className="filter_and_sort" onClick={this.handleClick}>
              <button value="cooking">Cooking</button>
              <button value="coding">Coding</button>
              <button value="football">Football</button>
            </label>
          </form>
          <form>
            Sort By:{" "}
            <label className="filter_and_sort" onClick={this.handleFilter}>
              {" "}
              <button value="created_at">Date</button>
              <button value="comment_count">Comment count</button>
              <button value="votes">Votes</button>
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
                        <em>{article.body.slice(0, 100) + "..."}</em>
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
    if (this.state.searchTerm !== prevState.searchTerm) {
      // this.fetchArticles()
      //   // = () => {
      //   //   api
      //   //     .getArticles(searchTerm, filterTerm)

      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles?topic=${this.state.searchTerm}`
        )
        .then(({ data }) => {
          this.setState({
            articles: data.articles
          });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }

    if (this.state.filterTerm !== prevState.filterTerm) {
      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles?sort_by=${this.state.filterTerm}`
        )
        .then(({ data }) => {
          this.setState({
            articles: data.articles
          });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }
  }

  fetchArticles = () => {
    api
      .getArticles(this.searchTerm, this.filterTerm)
      .then(articles => {
        this.setState({
          articles: articles,
          isLoading: false
        });
      })
      .catch(err => {
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
