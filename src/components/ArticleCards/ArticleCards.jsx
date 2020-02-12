import React from "react";
import { Link } from "@reach/router";

const ArticleCards = props => {
  const { articles } = props;

  return (
    <ul className="container grid-wrapper">
      <div className="container grid-wrapper">
        {articles.map(article => {
          return (
            <div className="box zone" key={article.article_id}>
              <li className="Header" className="articles">
                <div className="title">
                  <strong>{article.title}</strong>
                </div>
                <br />
                <div className="articlebody">
                  <em>{article.body.slice(0, 100) + "..."}</em> <br />
                  date: {article.created_at} <br />
                  comment count: {article.comment_count} <br />
                  votes: {article.votes}
                </div>
                <Link to={`/articles/${article.article_id}`}>
                  <button>--></button>
                </Link>
              </li>
            </div>
          );
        })}
      </div>
    </ul>
  );
};

export default ArticleCards;
