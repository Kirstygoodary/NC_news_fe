import axios from "axios";

const baseURL = "https://kirsty-g-nc-news.herokuapp.com/api";

export const getArticles = (searchTerm, filterTerm) => {
  return axios
    .get(`${baseURL}/articles`, {
      params: {
        topic: searchTerm,
        sort_by: filterTerm
      }
    })
    .then(({ data }) => {
      return data.articles;
    });
};

/**
 * // use axios params

import axios from 'axios'

export const getGames = genre, sort_by, order_by => {
    const endpoint = genre ? `genre_slug=${genre}` : '';
    return axios
    .get('https...', {
        params: {
            genre_slug: genre,
            sort_by: sort_by,
            order_by: order_by}
    })
    .then(...) => {
          return data.games }
 */
export default getArticles;
