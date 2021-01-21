import { combineReducers } from "redux";

import quoteReducer from "./kanyewestQuote";
import CandlestickReducer from './candlestickChart'

const rootReducers = combineReducers({
 dataQuote:quoteReducer,
 dataCandlestick:CandlestickReducer
});

export default rootReducers;