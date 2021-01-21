import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dayjs from 'dayjs'
import moment from 'moment'
import {sortBy, groupBy, chain} from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import getDataChart from '../redux/action/candlestickChart'



const CandlestickChart = ()=>{
    const dispatch = useDispatch()
    const dataApi = useSelector((state)=>state.dataCandlestick.data)
    const [series, setSeries] = useState([
        {
            data:[]
        }
    ])
   const options ={
    chart: {
        type: 'candlestick',
        height: 350
      },
      title: {
        text: 'CandleStick Chart',
        align: 'left'
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
}



    useEffect(()=>{
        dispatch(getDataChart())
    },[dispatch])

    useEffect(()=>{
        const sortedDate = sortBy(dataApi, (o)=>{
            return o.timestamps
        })
        // bwt pembanding timenya
        let groupTime = []
        // group time nya
        const groupData = groupBy(sortedDate, (d)=>{
            let time = new Date(d.timestamps)
            if(!groupTime) groupTime = new Date(time.getTime() + 5 * 60000)
            return time - groupTime < 300000 ? groupTime : groupTime = time
        })
        const FiveMinute = Object.values(groupData).map((value, index)=>{
            return value
        })
        let newdata= FiveMinute.map((v, idx)=>{
            let temp = [];
            let open = v[0].price
            let close = v[v.length-1].price;
            let low=0;
            let high=0;
            let time = v[0].timestamps + (idx *  5 * 60000) 
            v.map((e,idx)=>{
              if(idx === 0){
                low = e.price; 
              } else if(e.price<low) {
                low = e.price;
              }
              if(e.price > high){
                high = e.price;
               }
            })
         return {
             x:time,
             y:[open, close, high, low]
         }
       })
    
        setSeries([{data:newdata}])
    },[dataApi])
    const arrjing= [{
        data: [{
            x: new Date(1538778600000),
            y: [6629.81, 6650.5, 6623.04, 6633.33]
          },
          {
            x: new Date(1538780400000),
            y: [6632.01, 6643.59, 6620, 6630.11]
          },
          {
            x: new Date(1538782200000),
            y: [6630.71, 6648.95, 6623.34, 6635.65]
          },
          {
            x: new Date(1538784000000),
            y: [6635.65, 6651, 6629.67, 6638.24]
          },
          {
            x: new Date(1538785800000),
            y: [6638.24, 6640, 6620, 6624.47]
          },
          {
            x: new Date(1538787600000),
            y: [6624.53, 6636.03, 6621.68, 6624.31]
          },
        ]
        }]

    console.log('babi',series)
    console.log('anjing',arrjing)
    return(
        <div className="container">
            <div>
                <button>5 Minute</button>
                <button>15 Minute</button>
                <button>30 Minute</button>
                <button>3 Hours</button>
                <button>7 Hours</button>
                <button>1 Days</button>
                <button>1 Weeks</button>
                <button>1 Month</button>
            </div>
            <div>
                {dataApi &&  <Chart options={options} series={series} type="candlestick" height={350}/>}
            </div>
        </div>
    )
}

export default CandlestickChart