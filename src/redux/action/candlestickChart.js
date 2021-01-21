/** @format */

import { getChartApi} from "../../utils/api";
import { getChart } from "./type";

const getDataChart = () => {
  return {
    type: getChart,
    payload: getChartApi(),
  };
};

export default getDataChart;
