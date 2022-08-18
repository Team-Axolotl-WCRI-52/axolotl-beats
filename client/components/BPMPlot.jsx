import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Legend, Tooltip);

function BPMPlot(props) {
  const { breakpointsArr } = props;

  const data = {
    datasets: [],
  };

  const getBPMCoords = breakpointsArr.map((element) => {
    return {
      x: element.minute,
      y: element.bpm,
    };
  });

  const bpmObj = {
    label: 'BPM over time',
    data: getBPMCoords,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    showLine: true,
  };

  data.datasets.push(bpmObj);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Minutes',
        },
      },
      y: {
        title: {
          display: true,
          text: 'BPM',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return <Scatter data={data} options={options} />;
}
export default BPMPlot;
