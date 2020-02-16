import React from "react";
import axios from "axios";
import AddComment from "../AddComment/AddComment";
import CommentVoteChanger from "../CommentVoteChanger/CommentVoteChanger";
import ErrorPage from "../ErrorPage";

class ViewComments extends React.Component {
  state = {
    comments: [],
    isLoading: true,
    error: null
  };

  render() {
    const { comments, isLoading, error } = this.state;

    if (error) {
      return <ErrorPage err={error}></ErrorPage>;
    } else {
      if (isLoading === true) {
        return <p>Loading...</p>;
      } else {
        return (
          <div className="zonenoborder">
            <AddComment
              addItem={this.addItem}
              id={this.props.id}
              username={this.props.username}
            />
            <div className="title">Comments</div>

            <ul>
              {comments.map(comment => {
                return (
                  <li key={comment.comment_id}>
                    <strong>{comment.author}</strong> <br />
                    <em>{comment.body}</em>
                    <br />
                    created at: {comment.created_at}
                    <button
                      className={
                        comment.author === this.props.username
                          ? "displayDeleteButton"
                          : "dontDisplayDeleteButton"
                      }
                      value={comment.author}
                      onClick={e => {
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
          </div>
        );
      }
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
        this.setState({ error: err });
      });
  };

  addItem = newComment => {
    this.setState(currentState => {
      return {
        comments: [newComment, ...currentState.comments]
      };
    });
  };

  deleteComment = commentId => {
    axios
      .delete(
        `https://kirsty-g-nc-news.herokuapp.com/api/comments/${commentId}`
      )
      .then(() => {
        this.setState(currentState => {
          let commentsArray = currentState.comments.filter(function(comment) {
            return comment.comment_id !== commentId;
          });
          return {
            comments: commentsArray
          };
        });
      });
  };

  handleClick = (username, commentId) => {
    this.deleteComment(commentId);
  };
}

export default ViewComments;
