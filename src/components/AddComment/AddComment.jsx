import React from "react";
import axios from "axios";

class AddComment extends React.Component {
  state = {
    username: "",
    body: ""
  };

  render() {
    const { body } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            value={this.props.username}
            name={this.props.username}
            required
            type="text"
            onChange={event =>
              this.handleChange(event.target.value, "username")
            }
          />
        </label>
        <label htmlFor="username">
          Comments:
          <input
            required
            value={body}
            name={body}
            type="text"
            onChange={event => this.handleChange(event.target.value, "body")}
          />
        </label>
        <button>Post comment</button>
      </form>
    );
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
        console.log(data, "DATA IN POSTCOMMENT");
        return data.comment;
      })
      .catch(err => {
        console.dir(err, "error in postComment");
      });
  };
}

export default AddComment;
