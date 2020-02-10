import React from "react";
import axios from "axios";
import ViewComments from "../ViewComments/ViewComments";
import VoteChanger from "../VoteChanger/VoteChanger";
import AddComment from "../AddComment/AddComment";

class ArticlesById extends React.Component {
  state = {
    singleArticleData: {},
    isLoading: true,
    err: null
  };

  render() {
    const { singleArticleData, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <p>
            title: {singleArticleData.title} <br />
            author: {singleArticleData.author} <br />
            topic: {singleArticleData.topic} <br />
            article: {singleArticleData.body} <br />
          </p>
          <VoteChanger
            votes={singleArticleData.votes}
            id={singleArticleData.article_id}
          />
          <ViewComments
            username={this.props.username}
            id={singleArticleData.article_id}
          />
        </div>
      );
    }
  }

  componentDidMount() {
    axios
      .get(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`
      )
      .then(({ data }) => {
        this.setState({
          singleArticleData: data.article,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err, "error");
      });
  }
}

export default ArticlesById;
