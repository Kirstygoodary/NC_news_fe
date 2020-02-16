import React from "react";
import * as api from "../API/api";
import ErrorPage from "../ErrorPage";
import "../AllArticles/AllArticles.css";
import SortAndFilter from "../SortAndFilter/SortAndFilter";
import ArticleCards from "../ArticleCards/ArticleCards";

class AllArticles extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    searchTerm: "",
    filterTerm: "",
    error: null
  };

  render() {
    const { isLoading, error } = this.state;
    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else if (isLoading) return <p>Loading...</p>;
    else {
      return (
        <div>
          <SortAndFilter
            handleClick={this.handleClick}
            handleFilter={this.handleFilter}
          />
          <ArticleCards
            username={this.props.username}
            articles={this.state.articles}
          />
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
      // .then(({ data }) => {
      //   this.setState({
      //     articles: data.articles
      //   });
      // })
      // .catch(err => {
      //   this.setState({ error: err });
      // });
    }
  }

  fetchArticles = () => {
    const { searchTerm, filterTerm } = this.state;

    api
      .getArticles(searchTerm, filterTerm)
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
