/** @format */

import { getQuote, pending, rejected, fulfilled } from "../action/type";

const initialState = {
  data: null,
  error: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const quoteReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case getQuote + pending:
      return {
        ...prevState,
        isPending: true,
      };
    case getQuote + rejected:
      return {
        ...prevState,
        isRejected: true,
        error: payload,
        isPending: false,
      };
    case getQuote + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        data: payload.data.quote,
        isPending: false,
      };
    default:
      return prevState;
  }
};

export default quoteReducer;
