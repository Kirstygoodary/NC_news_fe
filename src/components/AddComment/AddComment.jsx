import React from "react";
import axios from "axios";
import ErrorPage from "../ErrorPage";

class AddComment extends React.Component {
  state = {
    username: "",
    body: "",
    error: null
  };

  render() {
    const { body, error } = this.state;

    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else {
      return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">
            Any views? Add your comment here!
            <br />
            <input
              className="commentinput"
              required
              value={body}
              name={body}
              type="text"
              onChange={event => this.handleChange(event.target.value, "body")}
            />
          </label>
          <br />
          <button>Post comment</button>
        </form>
      );
    }
  }

  handleChange = (value, key) => {
    this.setState({ [key]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { body } = this.state;
    const { username } = this.props;

    this.postComment({ username, body }).then(newComment => {
      this.props.addItem(newComment);
      this.setState({ username: "", body: "" });
    });
  };

  postComment = requestBody => {
    return axios
      .post(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}/comments`,
        requestBody
      )
      .then(({ data }) => {
        return data.comment;
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };
}

export default AddComment;
