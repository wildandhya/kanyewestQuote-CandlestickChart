/** @format */

import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import rpm from "redux-promise-middleware";

import rootReducers from "./reducer/index";

const logger = createLogger();

const enhancers = applyMiddleware(rpm, logger);

const store = createStore(rootReducers, enhancers);

export default store;
