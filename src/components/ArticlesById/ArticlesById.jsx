import React from "react";
import axios from "axios";
import ViewComments from "../ViewComments/ViewComments";
import { Link } from "@reach/router";
import AddComment from "../AddComment/AddComment";

class ArticlesById extends React.Component {
  state = {
    singleArticleData: null
  };

  render() {
    if (this.state.singleArticleData) {
      return (
        <div>
          <form>
            <p>
              title: {this.state.singleArticleData.title} <br />
              author: {this.state.singleArticleData.author} <br />
              topic: {this.state.singleArticleData.topic} <br />
              article: {this.state.singleArticleData.body} <br />
              comment count: {this.state.singleArticleData.comment_count} <br />
              votes: {this.state.singleArticleData.votes}
            </p>
          </form>
          {/* <Link
            // props={this.props}
            to={`/articles/${this.state.singleArticleData.article_id}/comments`}
          >
            <button>View Comments</button>
          </Link> */}
          <ViewComments id={this.props.id} />
          {/*<AddComment addItem={this.addItem} id={this.props.id} />*/}
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    axios
      .get("https://kirsty-g-nc-news.herokuapp.com/api/articles/")
      .then(({ data }) => {
        console.log(data);
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

  // addItem = newComment => {
  //   this.setState(currentState => {
  //     return {
  //       singleArticleData: [newComment, ...currentState.singleArticleData]
  //       //comments: [newComment, ...currentState.comments]
  //     };
  //   });
  // };
  /**
   * postAnItem = reqBody => {
    return axios
      .post("https://nc-student-tracker.herokuapp.com/api/students", reqBody)
      .then(({ data }) => {
        return data.student;
      });
  };
   */
}

export default ArticlesById;
