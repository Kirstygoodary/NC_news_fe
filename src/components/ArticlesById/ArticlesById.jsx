import React from "react";
import axios from "axios";
import ViewComments from "../ViewComments/ViewComments";
import VoteChanger from "../VoteChanger/VoteChanger";
import { Link } from "@reach/router";

class ArticlesById extends React.Component {
  state = {
    singleArticleData: {},
    isLoading: true
  };

  render() {
    const { singleArticleData, isLoading } = this.state;
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
          {/* <button onClick={() => this.handleClick(1)}>Vote up</button>
            <button onClick={() => this.handleClick(-1)}>Vote down</button> */}

          {/* <Link
            // props={this.props}
            to={`/articles/${this.state.singleArticleData.article_id}/comments`}
          >
            <button>View Comments</button>
          </Link> */}

          <ViewComments id={this.state.singleArticleData.article_id} />
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
