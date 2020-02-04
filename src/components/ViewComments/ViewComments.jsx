import React from "react";
import axios from "axios";

class ViewComments extends React.Component {
  state = {
    comments: null
  };

  render() {
    console.log(this.state.comments, "<<<render State");
    if (this.state.comments) {
      return (
        <ul>
          {this.state.comments.map(comment => {
            return (
              <li key={comment.comment_id}>
                author: {comment.author} <br />
                comment: {comment.body} <br />
                created at: {comment.created_at} <br />
                votes: {comment.votes}
              </li>
            );
          })}
        </ul>
        // <p>Comments: {this.state.comments}</p>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    axios
      .get("https://kirsty-g-nc-news.herokuapp.com/api/articles")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          comments: data.comments
        });
      })
      .catch(err => {
        console.log(err, "error in CDU for ViewComments");
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.singleArticleData !== prevState.comments) {
      axios
        .get(
          `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}/comments`
        )
        .then(({ data }) => {
          console.log(data, "data in ViewComments");
          this.setState({ comments: data.comments });
        })
        .catch(err => {
          console.log(err, "error in CDU");
        });
    }
  }
}

export default ViewComments;
