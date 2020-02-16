import React from "react";

import { Link } from "@reach/router";

const ArticleCards = props => {
  const { articles, username } = props;

  return (
    <ul className="container grid-wrapper">
      {articles.map(article => {
        return (
          <li>
            <div
              className="Header"
              className="articles"
              className="box zone"
              key={article.article_id}
            >
              <div className="title">
                <Link
                  to={`/articles/${article.article_id}`}
                  username={username}
                  id={article.article_id}
                >
                  {article.title}
                </Link>
              </div>
              <br />
              <div className="articlebody">
                <em>{article.body.slice(0, 100) + "..."}</em> <br />
                date: {article.created_at} <br />
                comment count: {article.comment_count} <br />
                votes: {article.votes}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ArticleCards;
