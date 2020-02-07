import React from "react";
import axios from "axios";
import * as api from "../API/api";

import { Link } from "@reach/router";
import ErrorPage from "../ErrorPage";
import "../AllArticles/AllArticles.css";

class AllArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    searchTerm: "",
    filterTerm: "",
    error: null,
    user: "jessjelly"
  };

  render() {
    const { articles, isLoading, searchTerm, error, filterTerm } = this.state;
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
            <div class="container grid-wrapper">
              {articles.map(article => {
                return (
                  <div class="box zone">
                    <li
                      className="Header"
                      className="articles"
                      key={article.article_id}
                    >
                      <panel className="title">
                        <strong>{article.title}</strong>
                      </panel>
                      <br />
                      <panel className="articlebody">
                        <em>{article.body.slice(0, 100) + "..."}</em>
                        date: {article.created_at} <br />
                        comment count: {article.comment_count} <br />
                        votes: {article.votes}
                      </panel>
                      <Link
                        id={this.props.id}
                        to={`/articles/${article.article_id}`}
                      >
                        <button>--></button>
                      </Link>
                    </li>
                  </div>
                );
              })}
            </div>
          </ul>
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
      //   //     .getArticles(topic, sort_by, order_by)

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
