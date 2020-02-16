import React from "react";
import axios from "axios";
import * as api from "../API/api";
import ViewComments from "../ViewComments/ViewComments";
import VoteChanger from "../VoteChanger/VoteChanger";
import ErrorPage from "../ErrorPage";

class ArticlesById extends React.Component {
  state = {
    singleArticleData: {},
    isLoading: true,
    error: null
  };

  render() {
    const { singleArticleData, isLoading, error } = this.state;

    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else {
      if (isLoading) {
        return <p>Loading...</p>;
      } else {
        return (
          <div>
            <div
              className="Header"
              className="articles"
              className="box zonenohov"
            >
              <p>
                <div className="title">
                  {singleArticleData.title} <br />
                </div>
                <p></p>
                <em>
                  <strong>Author:</strong> {singleArticleData.author} &nbsp;{" "}
                  <strong>Topic:</strong> {singleArticleData.topic} <br />
                </em>
                {singleArticleData.body} <br />
              </p>
              <VoteChanger
                votes={singleArticleData.votes}
                id={singleArticleData.article_id}
              />
            </div>
            <ViewComments
              username={this.props.username}
              id={singleArticleData.article_id}
            />
          </div>
        );
      }
    }
  }

  componentDidMount() {
    this.getArticlesById();
    // axios
    //   .get(
    //     `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`
    //   )
    //   .then(({ data }) => {
    //     this.setState({
    //       singleArticleData: data.article,
    //       isLoading: false
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({ error: err });
    //   });
  }

  getArticlesById = () => {
    api
      .getArticleById(this.props.id)
      .then(article => {
        this.setState({
          singleArticleData: article,
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default ArticlesById;
