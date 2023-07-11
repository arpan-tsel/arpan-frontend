import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/Header';
import Sidebar from '../../Sidebar/Sidebar';
import PieChartPointer from './PieChartPointer';
import LineChartPointer from './LineChartPointer';

const Pointer = () => {

  //pie chart
  const [data, setData]= useState({
    datasets:[{
      data: [10, 20, 30],
      backgroundColor:['#00a65a', '#f39c12', '#f56954', '#00c0ef']
    },
    ],
  });

  //line chart
  const [linedata, setLinedata]= useState({
    datasets:[
      {
        label:'Business Solution Management Postpaid, Roaming and Interconnect',
        data: [21, 35, 45, 51, 46, 49, 56, 53, 68, 75, 63, 52],
        fill: false, 
        backgroundColor: '#00a65a',
        borderColor: '#00a65a' 
      },
      {
        label:'Channel and Acquisition Development',
        data: [21, 35, 45, 51, 46, 49, 56, 53, 68, 75, 63, 52],
        fill: false, 
        backgroundColor: '#f39c12',
        borderColor: '#f39c12' 
      },
      {
        label: 'Roaming and Interconnect Development ',
        data: [51, 69, 63, 57, 63, 71, 54, 59, 46, 60, 52, 78],
        fill: false, 
        backgroundColor: '#f56954',
        borderColor: '#f56954' 
      },
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  });

  useEffect(()=>{
    fetchData();
  }, []);

  useEffect(()=>{
    linechart();
  }, []);

  //pie chart function
  const fetchData = () =>  {
    axios.get(`getpiechartpointer`).then(res => {
      const resp = res.data;
      return resp
    }).then((resp) => {
      console.log("resp pie chart", resp)
      const datas = [];
      const labels =[];
      for(var i of resp) {
        datas.push(i.counter)
        labels.push(i.department)
      }
      setData({
        datasets: [{
          data:datas,
            backgroundColor:[
              '#00a65a', '#f39c12', '#f56954', '#00c0ef'
            ]
          },
        ],
      })
      setChartDataPie(data)
      console.log(data)

    }).catch(e => {
      console.log("error", e)
    }) 
  };

  //line chart function
  const linechart = () =>{
    axios.get(`getlinechartpointer`).then(res =>{
      const resp = res.data;
      return resp
    }).then((resp)=>{
        console.log("resp line chart", resp)
        const datas = [];
        let index = 0;
        let datasTemp = [];
        for(var i of resp) {
          for(var j of Object.values(i)){
            datasTemp.push(j)
          }
          datas.push(datasTemp);
          datasTemp = [];
          index++;
        }

        const labels =[];
        for(var i of resp) {
          labels.push(i.department)
        }
        console.log("dataa", datas);

        for(var i=0; i<4; i++ ) {
          if (typeof(labels[i]) == "undefined"){
            labels[i] = '-'
          }
        }
      
        setLinedata({
          datasets:[
            {
              label:labels[0],
              data: datas[0],
              fill: false, 
              backgroundColor: '#00a65a',
              borderColor: '#00a65a' 
            },
            {
              label: labels[1],
              data: datas[1],
              fill: false, 
              backgroundColor: '#f39c12',
              borderColor: '#f39c12' 
            },
            {
              label: labels[2],
              data: datas[2],
              fill: false, 
              backgroundColor: '#f56954',
              borderColor: '#f56954' 
            },
          ],
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        })

      }).catch(err => {
        console.log("error", err)
      })
  }

  const [chartDataPie, setChartDataPie] = useState(data)

  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="content-wrapper">

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Pointer Division</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Visualization</li>
                  <li className="breadcrumb-item active">Pointer</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="col-md-12">
                  <div className="card card-danger">
                    <div className="card-header">
                      <h3 className="card-title">Request Statistics per Department (RFS +RFI)</h3>
                    </div>
                    <div className="card-body-table" style={{width:'60%', marginLeft:'25%'}}>
                      <LineChartPointer chartDataLine ={linedata}/>
                    </div>
                    <div className="card-body-table" style={{width:'60%', marginLeft:'25%'}}>
                      <PieChartPointer chartDataPie ={data}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
  )
}

export default Pointer