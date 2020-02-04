import React from "react";
import axios from "axios";
import AddComment from "../AddComment/AddComment";

class ViewComments extends React.Component {
  state = {
    comments: null
  };

  render() {
    const { comments } = this.state;
    if (comments) {
      return (
        <div>
          <form>
            <ul>
              {(console.log(comments), "COMMENTS")}
              {comments.map(comment => {
                return (
                  <li key={comment.comment_id}>
                    author: {comment.author} <br />
                    comment: {comment.body} <br />
                    created at: {comment.created_at} <br />
                    votes: {comment.votes}
                  </li>
                );
              })}
            </ul>
          </form>
          <AddComment addItem={this.addItem} id={this.props.id} />
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    axios
      .get(
        `https://kirsty-g-nc-news.herokuapp.com/api/articles/${this.props.id}/comments`
      )
      .then(({ data }) => {
        console.log(data, "THIS IS THE DATA");
        this.setState({
          comments: data.comments
        });
      })
      .catch(err => {
        console.log(err, "error in CDU for ViewComments");
      });
  }

  addItem = newComment => {
    this.setState(currentState => {
      return {
        comments: [newComment, ...currentState.comments]
      };
    });
  };

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
}

export default ViewComments;
