import React from "react";
import axios from "axios";
import { Link } from "@reach/router";

class Home extends React.Component {
  state = {
    articles: [],
    isLoading: true,
    user: "jessjelly"
  };

  render() {
    const { articles, isLoading } = this.state;

    if (isLoading) return <p>Loading...</p>;
    else
      return (
        <ul>
          {articles.map(article => {
            return (
              <li key={article.article_id}>
                {article.title}, {article.body}, {article.votes},{" "}
                {article.topic}, {article.author}, {article.comment_count}
              </li>
            );
          })}
        </ul>
      );
  }
  componentDidMount() {
    axios
      .get("https://kirsty-g-nc-news.herokuapp.com/api/articles")
      .then(({ data }) => {
        console.log(data, "<<<<data");
        this.setState({
          articles: data.articles,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Home;
