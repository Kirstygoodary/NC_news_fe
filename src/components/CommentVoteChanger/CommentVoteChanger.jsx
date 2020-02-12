import React from "react";
import axios from "axios";

class CommentVoteChanger extends React.Component {
  state = {
    commentVote: 0,
    disabledButton: false
  };

  render() {
    const { commentVote, disabledButton } = this.state;
    return (
      <section>
        <button
          disabled={disabledButton === true}
          onClick={() => this.handleClick(1)}
        >
          Vote up
        </button>
        <p> Votes: {this.props.votes + commentVote} </p>
        <button
          disabled={disabledButton === true}
          onClick={() => this.handleClick(-1)}
        >
          Vote down
        </button>
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
        this.setState(prevState => {
          return {
            commentVote: prevState.commentVote + voteDifference,
            disabledButton: true
          };
        });
      })
      .catch(err => {
        console.log(err, "error in patch req for comment votes");
      });
    // .then(() => {
    //   this.setState(currentState => {
    //     return {
    //       commentVote: currentState.commentVote + voteDifference,
    //       disabledButton: true
    //     };
    //   });
    // })
    // .catch(err => {
    //   console.log(err, "error in patch req for comment votes");
    // });
  };
}

export default CommentVoteChanger;
