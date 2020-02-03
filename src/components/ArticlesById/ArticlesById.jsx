import React from "react";
import axios from "axios";
import { Link } from "@reach/router";

class ArticlesById extends React.Component {
  state = {
    singleArticleData: null
  };

  render() {
    if (this.state.singleArticleData) {
      return (
        <form>
          <p>
            title: {this.state.singleArticleData.title} <br />
            author: {this.state.singleArticleData.author} <br />
            topic: {this.state.singleArticleData.topic} <br />
            article: {this.state.singleArticleData.body} <br />
            comment count: {this.state.singleArticleData.comment_count} <br />
            votes: {this.state.singleArticleData.votes}
          </p>
          <Link
            to={`/students/${this.state.singleArticleData.article_id}/comments`}
          >
            <button>View Comments</button>
          </Link>
        </form>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    axios
      .get("https://kirsty-g-nc-news.herokuapp.com/api/articles/")
      .then(({ data }) => {
        this.setState({
          singleArticleData: data.articles
        });
      })
      .catch(err => {
        console.log(err, "error");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.articles !== prevState.singleArticleData) {
      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`
        )
        .then(({ data }) => {
          this.setState({ singleArticleData: data.article });
        })
        .catch(err => {
          console.log(err, "error in CDU");
        });
    }
  }
}

export default ArticlesById;
