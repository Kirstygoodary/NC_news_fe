import React from "react";
import axios from "axios";

class VoteChanger extends React.Component {
  state = {
    voteChange: 0
  };

  render() {
    return (
      <section>
        <button onClick={() => this.handleClick(1)}>Vote up</button>
        <p> Votes: {this.props.votes + this.state.voteChange} </p>
        <button onClick={() => this.handleClick(-1)}>Vote down</button>
      </section>
    );
  }

  handleClick = voteDifference => {
    axios
      .patch(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`,
        { inc_votes: voteDifference }
      )
      .then(() => {
        this.setState(currentState => {
          return { voteChange: currentState.voteChange + voteDifference };
        });
      })
      .catch(err => {
        console.log(err, "error in patch req for votes");
      });
  };
}

export default VoteChanger;
