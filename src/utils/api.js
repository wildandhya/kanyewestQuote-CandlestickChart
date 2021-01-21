/** @format */

import axios from "axios";

export const getQuoteApi = () => {
  return axios.get("https://api.kanye.rest");
};

export const getChartApi = () => {
  return axios.get("https://testfai.herokuapp.com/ticker");
};
