import React from "react";
import axios from "axios";
import AddComment from "../AddComment/AddComment";

class ViewComments extends React.Component {
  state = {
    comments: []
    // isLoading: true
  };

  render() {
    const { comments, isLoading } = this.state;
    // if (isLoading === true) {
    //   return <p>Loading...</p>;
    // } else {
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
                <button onClick={this.handleClick}>Delete Comment</button>
              </li>
            );
          })}
        </ul>

        <AddComment addItem={this.addItem} id={this.props.id} />
      </div>
    );
    // }
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
        console.log(data.comments, "THIS IS THE DATA");
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

  handleClick = () => {
    console.log(this.props.username, "CHECKING USERNAME");
    if (this.props.username === this.state.comments.author) {
    }
  };
}

export default ViewComments;

// componentDidUpdate(prevProps, prevState) {
//   if (this.props.singleArticleData !== prevState.comments) {
//     axios
//       .get(
//         `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}/comments`
//       )
//       .then(({ data }) => {
//         console.log(data, "data in ViewComments");
//         this.setState({ comments: data.comments });
//       })
//       .catch(err => {
//         console.log(err, "error in CDU");
//       });
//   }
// }
