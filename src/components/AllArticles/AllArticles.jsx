import React from "react";
import axios from "axios";
import { Link } from "@reach/router";
import ErrorPage from "../ErrorPage";

class AllArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    searchTerm: "",
    filterTerm: "",
    err: null,
    user: "jessjelly"
  };

  render() {
    const { articles, isLoading, searchTerm, err, filterTerm } = this.state;
    if (err) {
      return <ErrorPage err={err}></ErrorPage>;
    } else if (isLoading) return <p>Loading...</p>;
    else
      return (
        <div>
          <form>
            Filter By:{" "}
            <label onClick={this.handleClick}>
              <button value="cooking">Cooking</button>
              <button value="coding">Coding</button>
              <button value="football">Football</button>
            </label>
          </form>
          <form>
            Sort By:{" "}
            <label onClick={this.handleFilter}>
              {" "}
              <button value="created_at">Date</button>
              <button value="comment_count">Comment count</button>
              <button value="votes">Votes</button>
            </label>
          </form>
          <ul>
            {articles.map(article => {
              return (
                <li key={article.article_id}>
                  title: {article.title} <br />
                  article: {article.body.slice(0, 100) + "..."}
                  date: {article.created_at} <br />
                  comment count: {article.comment_count} <br />
                  votes: {article.votes}
                  <Link to={`/articles/${article.article_id}`}>
                    <button>--></button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }

  componentDidMount() {
    axios
      .get("https://kirsty-g-nc-news.herokuapp.com/api/articles")
      .then(({ data }) => {
        this.setState({
          articles: data.articles,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ err: err });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchTerm !== prevState.searchTerm) {
      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles?topic=${this.state.searchTerm}`
        )
        .then(({ data }) => {
          this.setState({
            articles: data.articles
          });
        });
    }
    if (this.state.filterTerm !== prevState.filterTerm) {
      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles?sort_by=${this.state.filterTerm}`
        )
        .then(({ data }) => {
          console.log(data, "DATAAAA");
          this.setState({
            articles: data.articles
          });
        });
    }
  }

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
