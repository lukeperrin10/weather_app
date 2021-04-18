import React from "react";
import { Line } from "react-chartjs-2";



const Weatherforecast = (props) => {
  let dateGraph = [];
  let sunriseGraph = [];
  
  

  if (props.data) {
    props.data.forEach((props) => {
      let date = new Date(props.dt * 1000);
      let sunrise = new (Date(data.sunrise * 1000))();

      date.push(dateGraph);
      sunrise.push(sunriseGraph);
    });
  }

   let data = {
    labels: dateGraph,
    datasets: [
      {
        label: "Surise Time",
        data: sunriseGraph,
      },
    ],
  };

  return (
  <div>
    {data && <Line data={data}
     height={300} width={400} />}
     </div>
  )
};

export default Weatherforecast;
