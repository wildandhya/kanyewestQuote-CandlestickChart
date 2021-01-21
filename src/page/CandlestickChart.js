import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {sortBy, groupBy} from 'lodash'
import { useDispatch, useSelector } from "react-redux";
import getDataChart from '../redux/action/candlestickChart'



const CandlestickChart = ()=>{
    const dispatch = useDispatch()
    const dataApi = useSelector((state)=>state.dataCandlestick.data)
    const loading = useSelector((state)=>state.dataCandlestick.isPending)
    console.log(loading)
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

        // sorted by timestamps
        const sortedDate = sortBy(dataApi, (o)=>{
            return o.timestamps
        })

        // group by time
        let group5Minuets = []
        const groupData5 = groupBy(sortedDate, (d)=>{
            let time = new Date(d.timestamps)
            if(! group5Minuets)  group5Minuets = new Date(time.getTime() + 5 * 60000)
            return time -  group5Minuets < 300000 ?  group5Minuets :  group5Minuets = time
        })
        let group15Minutes = []
        const groupData15 = groupBy(sortedDate, (e)=>{
            let time = new Date(e.timestamps)
            if(!group15Minutes) group15Minutes = new Date(time.getTime() + 15 * 60000)
            return time - group15Minutes < 900000 ? group15Minutes : group15Minutes = time
        })
        let group30Minutes = []
        const groupData30 = groupBy(sortedDate, (e)=>{
            let time = new Date(e.timestamps)
            if(!group30Minutes) group30Minutes = new Date(time.getTime() + 15 * 60000)
            return time - group30Minutes < 1800000 ? group30Minutes : group30Minutes = time
        })

        // interval time
        const DataInterval5Minute = Object.values(groupData5).map((value)=>{
            return value
        })
        const DataInterval15Minute = Object.values(groupData15).map((value)=>{
            return value
        })
        const DataInterval30Minute = Object.values(groupData30).map((value)=>{
            return value
        })

        // get data open, high, low , close
        let data5= DataInterval5Minute.map((v, idx)=>{
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
             y:[open, high, low, close]
         }
       })
       let data15= DataInterval15Minute.map((v, idx)=>{
        let open = v[0].price
        let close = v[v.length-1].price;
        let low=0;
        let high=0;
        let time = v[0].timestamps + (idx *  15 * 60000) 
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
         y:[open, high, low, close]
     }
   })
   let data30= DataInterval30Minute.map((v, idx)=>{
    let open = v[0].price
    let close = v[v.length-1].price;
    let low=0;
    let high=0;
    let time = v[0].timestamps + (idx *  30 * 60000) 
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
     y:[open, high, low, close]
 }
})
    

    // handle event onClick
    const showDisplay5Minutes = ()=>{
        setSeries([{data:data5}])
    }
    const showDisplay15Minutes = ()=>{
        setSeries([{data:data15}])
    }
    const showDisplay30Minutes = ()=>{
        setSeries([{data:data30}])
    }

    return(
        <div className="container">
            <div>
                <button onClick={showDisplay5Minutes}>5 Minute</button>
                <button onClick={showDisplay15Minutes}>15 Minute</button>
                <button onClick={showDisplay30Minutes}>30 Minute</button>
                <button>3 Hours</button>
                <button>7 Hours</button>
                <button>1 Days</button>
                <button>1 Weeks</button>
                <button>1 Month</button>
            </div>
            {loading?<h3>Loading ...</h3>:( <div>
                {dataApi &&  <Chart options={options} series={series} type="candlestick" height={350}/>}
            </div>)}
        </div>
    )
}

export default CandlestickChart