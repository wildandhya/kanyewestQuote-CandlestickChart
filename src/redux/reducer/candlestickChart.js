/** @format */

import { getChart, pending, rejected, fulfilled } from "../action/type";

const initialState = {
  data: null,
  error: null,
  isPending: false,
  isFulfilled: false,
  isRejected: false,
};

const CandlestickReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case getChart + pending:
      return {
        ...prevState,
        isPending: true,
      };
    case getChart + rejected:
      return {
        ...prevState,
        isRejected: true,
        error: payload,
        isPending: false,
      };
    case getChart + fulfilled:
      return {
        ...prevState,
        isFulfilled: true,
        data: payload.data.ticker,
        isPending: false,
      };
    default:
      return prevState;
  }
};

export default CandlestickReducer;
