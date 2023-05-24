//pie chart for dashboard

import React from "react";
import { Pie } from "react-chartjs-2";
import './PieChart.css'
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from "chart.js";
Chart.register(ChartDataLabels);

function PieChart({ chartDataPie }) {

  return (
  <div className="pie-chart">
  <Pie
   data={chartDataPie} 
  options={
    {
      plugins: {
        datalabels: {
          display: true,
          color: "white",
          align: "end",
          font:{
            size: 15
          },
          padding: {
            right: 2
          },
          labels: {
            padding: { top: 10 },
            title: {
              font: {
                weight: "normal"
              }
            }
          },
          formatter: (value, context) =>{
            // console.log(context.chart.data.datasets[0].data);
            const datapoints = context.chart.data.datasets[0].data;
            function totalSum(total, datapoint){
              return total + datapoint;
            }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = (value / totalValue * 100).toFixed(1);
            const display = [`${value}`, `${percentageValue}%`]
            return display;
          }
        },
        tooltip: {
          enabled: false
        }
      }
  }}
  />
  <br/>
  </div>
  );
}

export default PieChart;