import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import KanyewestQuote from "./page/KanyewestQuote";
import CandlestickChart from "./page/CandlestickChart";


const AppRouter = () => {
  return (
    <Router>
      <Route exact path='/' component={KanyewestQuote} />
      <Route path='/Candlesticks' component={CandlestickChart} />
    </Router>
  );
};
export default AppRouter;