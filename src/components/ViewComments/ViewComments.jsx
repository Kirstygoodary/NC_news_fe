import React from "react";
import axios from "axios";
import AddComment from "../AddComment/AddComment";
import CommentVoteChanger from "../CommentVoteChanger/CommentVoteChanger";

class ViewComments extends React.Component {
  state = {
    comments: [],
    isLoading: true
  };

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading === true) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <ul>
            {comments.map(comment => {
              return (
                <li id="commentList" key={comment.comment_id}>
                  author: {comment.author} <br />
                  comment: {comment.body} <br />
                  created at: {comment.created_at} <br />
                  votes: {comment.votes} <br />
                  <button
                    value={comment.author}
                    onClick={e => {
                      console.log(e.target.value);
                      this.handleClick(e.target.value, comment.comment_id);
                    }}
                  >
                    Delete Comment
                  </button>
                  <>
                    <CommentVoteChanger
                      votes={comment.votes}
                      id={comment.comment_id}
                    />{" "}
                  </>
                </li>
              );
            })}
          </ul>

          <AddComment
            addItem={this.addItem}
            id={this.props.id}
            username={this.props.username}
          />
        </div>
      );
    }
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = () => {
    return axios
      .get(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}/comments`
      )
      .then(({ data }) => {
        this.setState({
          comments: data.comments,
          isLoading: false
        });
      })
      .catch(err => {
        console.dir(err, "error in getComments()");
      });
  };

  addItem = newComment => {
    this.setState(currentState => {
      return {
        comments: [newComment, ...currentState.comments]
      };
    });
  };

  deleteComment(commentId) {
    return axios
      .delete(
        `https://kirsty-g-nc-news.herokuapp.com/api/comments/${commentId}`
      )
      .then(() => {
        this.getComments();
      });
  }

  handleClick = (username, commentId) => {
    console.log(this.state.comments, "CHECKING USERNAME");
    console.log("Username:", username);
    console.log("Comment ID:", commentId);

    if (username === "jessjelly") {
      this.deleteComment(commentId);
    } else {
      console.log("Username not jess");
    }
  };
}

export default ViewComments;
