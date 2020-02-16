import React from "react";
import axios from "axios";
import ErrorPage from "../ErrorPage";

class CommentVoteChanger extends React.Component {
  state = {
    commentVote: 0,
    disabledButton: false,
    error: null
  };

  render() {
    const { commentVote, disabledButton, error } = this.state;
    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else {
      return (
        <section>
          <button
            disabled={disabledButton === true}
            onClick={() => this.handleClick(-1)}
          >
            -
          </button>
          &nbsp; Votes: {this.props.votes + commentVote} &nbsp;
          <button
            disabled={disabledButton === true}
            onClick={() => this.handleClick(1)}
          >
            +
          </button>
          <p></p>
        </section>
      );
    }
  }

  handleClick = voteDifference => {
    axios
      .patch(
        `https://kirsty-g-nc-news.herokuapp.com/api/comments/${this.props.id}`,
        { inc_votes: voteDifference }
      )
      .then(() => {
        this.setState(prevState => {
          return {
            commentVote: prevState.commentVote + voteDifference,
            disabledButton: true
          };
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default CommentVoteChanger;
