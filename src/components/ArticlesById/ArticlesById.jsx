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
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <p>
            title: {this.state.singleArticleData.title} <br />
            author: {this.state.singleArticleData.author} <br />
            topic: {this.state.singleArticleData.topic} <br />
            article: {this.state.singleArticleData.body} <br />
          </p>
          <VoteChanger
            votes={this.state.singleArticleData.votes}
            id={this.state.singleArticleData.article_id}
          />
          <ViewComments
            username={this.props.username}
            id={this.state.singleArticleData.article_id}
          />
          {/*<AddComment id={this.state.singleArticleData.article_id} />*/}
          {/*<AddComment username={this.props.username}*/}
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
