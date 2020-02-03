import React from "react";
import axios from "axios";

class ViewComments extends React.Component {
  state = {
    comments: null
  };

  render() {
    console.log(this.state.comments);
    if (this.state.comments) {
      return (
        <form>
          <p>{this.state.comments}</p>
        </form>
      );
    } else {
      return <p>Loading...</p>;
    }
  }

  componentDidMount() {
    axios
      .get("https://nc-student-tracker.herokuapp.com/api/students/")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          comments: data.comments
        });
      })
      .catch(err => {
        console.log(err, "error in CDU for ViewComments");
      });
  }

  // componentDidUpdate(prevProps) {
  //   console.log(this.props);
  // }
}

export default ViewComments;
