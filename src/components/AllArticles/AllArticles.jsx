import React from "react";
import axios from "axios";
import { Link } from "@reach/router";

class AllArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    searchTerm: "",
    filterTerm: "",
    user: "jessjelly"
  };

  render() {
    const { articles, isLoading, searchTerm, filterTerm } = this.state;
    if (isLoading) return <p>Loading...</p>;
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
            <label onClick={() => this.handleFilter({ filterTerm })}>
              <button value="created_at">Date</button>
              <button value="comment_id">Comment count</button>{" "}
              {/* route is "students/:article_id/comments" */}
              <button value="votes">Votes</button>
            </label>
          </form>
          <ul>
            {articles.map(article => {
              return (
                <li key={article.article_id}>
                  title: {article.title} <br />
                  article: {article.body.slice(0, 100) + "..."}
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
        console.log(err);
      });
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
