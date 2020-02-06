import React from "react";
import axios from "axios";

class CommentVoteChanger extends React.Component {
  state = {
    commentVote: 0
  };

  render() {
    return (
      <section>
        <button onClick={() => this.handleClick(1)}>Vote up</button>
        <p> Votes: {this.props.votes + this.state.commentVote} </p>
        <button onClick={() => this.handleClick(-1)}>Vote down</button>
      </section>
    );
  }

  handleClick = voteDifference => {
    axios
      .patch(
        `https://kirsty-g-nc-news.herokuapp.com/api/comments/${this.props.id}`,
        { inc_votes: voteDifference }
      )
      .then(() => {
        this.setState(currentState => {
          return { commentVote: currentState.commentVote + voteDifference };
        });
      })
      .catch(err => {
        console.log(err, "error in patch req for comment votes");
      });
  };
}

export default CommentVoteChanger;
