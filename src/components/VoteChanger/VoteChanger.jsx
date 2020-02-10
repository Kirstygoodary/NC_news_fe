import React from "react";
import axios from "axios";

class VoteChanger extends React.Component {
  state = {
    voteChange: 0,
    disabledButton: false
  };

  render() {
    const { voteChange, disabledButton } = this.state;

    return (
      <section>
        <button
          disabled={disabledButton === true}
          onClick={() => this.handleClick(1)}
        >
          Vote up
        </button>
        <p> Votes: {this.props.votes + voteChange} </p>
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
    axios.patch(
      `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`,
      { inc_votes: voteDifference }
    );
    this.setState(prevState => {
      return {
        voteChange: prevState.voteChange + voteDifference,
        disabledButton: true
      };
    });
    // .then(() => {
    //   this.setState(currentState => {
    //     return {
    //       voteChange: currentState.voteChange + voteDifference,
    //       disabledButton: true
    //     };
    //   });
    // })
    // .catch(err => {
    //   console.log(err, "error in patch req for votes");
    // });
  };
}

export default VoteChanger;
