/** @format */

import axios from "axios";

const url = "https://api.kanye.rest";
export const getQuoteApi = () => {
  return axios.get(url);
};
