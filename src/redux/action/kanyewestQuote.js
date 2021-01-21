/** @format */

import { getQuoteApi } from "../../utils/api";
import { getQuote } from "./type";

const getQuoteAction = () => {
  return {
    type: getQuote,
    payload: getQuoteApi(),
  };
};

export default getQuoteAction;
