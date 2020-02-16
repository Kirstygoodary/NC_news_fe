import React from "react";
import axios from "axios";
import * as api from "../API/api";
import ErrorPage from "../ErrorPage";

class VoteChanger extends React.Component {
  state = {
    voteChange: 0,
    disabledButton: false,
    error: null
  };

  render() {
    const { voteChange, disabledButton, error } = this.state;
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
          &nbsp; Votes: {this.props.votes + voteChange} &nbsp;
          <button
            disabled={disabledButton === true}
            onClick={() => this.handleClick(1)}
          >
            +
          </button>
        </section>
      );
    }
  }

  handleClick = voteDifference => {
    // this.patchArticlesById(this.props.id, voteDifference);
    axios
      .patch(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}`,
        { inc_votes: voteDifference }
      )
      .then(() => {
        this.setState(prevState => {
          return {
            voteChange: prevState.voteChange + voteDifference,
            disabledButton: true
          };
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  // patchArticlesById = () => {
  //   api
  //     .patchArticleById(this.props.id, voteDifference)
  //     .then(response => {
  //       this.setState(prevState => {
  //         return {
  //           voteChange: prevState.voteChange + voteDifference,
  //           disabledButton: true
  //         };
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({ error: err });
  //     });
  // };
}

export default VoteChanger;
