import axios from "axios";

const baseURL = "https://kirsty-g-nc-news.herokuapp.com/api";

export const getTopics = () => {
  return axios.get(`${baseURL}/topics`).then(({ data }) => {
    return data.topics;
  });
};

export default getTopics;
