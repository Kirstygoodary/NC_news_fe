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
          <AddComment
            addItem={this.addItem}
            id={this.props.id}
            username={this.props.username}
          />
          <ul>
            {comments.map(comment => {
              return (
                <li id="commentList" key={comment.comment_id}>
                  author: {comment.author} <br />
                  comment: {comment.body} <br />
                  created at: {comment.created_at} <br />
                  votes: {comment.votes} <br />
                  <button
                    className={
                      comment.author === this.props.username
                        ? "displayDeleteButton"
                        : "dontDisplayDeleteButton"
                    }
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

  // deleteComment(commentId) {
  //   return axios
  //     .delete(
  //       `https://kirsty-g-nc-news.herokuapp.com/api/comments/${commentId}`
  //     )
  //     .then(() => {
  //       this.getComments();
  //     });
  // }

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
    // this.setState(currentState => {
    //   let commentsArray = currentState.comments.filter(function(comment) {
    //     return comment.comment_id !== commentId;
    //   });
    //   if (currentState.comments.author === this.props.username) {
    //     return {
    //       comments: commentsArray,
    //       displayDeleteButton: true
    //     };
    //   } else
    //     return {
    //       comments: commentsArray,
    //       displayDeleteButton: false
    //     };
    // }).catch(err => {
    //   console.log(err);
    // });

    //}
    //   let commentsArray = this.state.comments.filter(function(comment) {
    //     return comment.comment_id !== commentID;

    //   });
    // });
  };

  handleClick = (username, commentId) => {
    // if (username === "jessjelly") {
    this.deleteComment(commentId);
    // } else {
    //   console.log("Username not jess");
    // }
  };
}

export default ViewComments;
