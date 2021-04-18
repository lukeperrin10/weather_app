import React from "react";
import { Line } from "react-chartjs-2";



const Weatherforecast = (props) => {
  let dateGraph = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
  let sunriseGraph = [];
  
  

  if (props.data) {
    props.data.forEach((props) => {
      let sunrise = new (Date(props.location.sunrise * 1000))();
      sunrise.push(sunriseGraph);
    });
  }

   let data = {
    labels: dateGraph,
    datasets: [
      {
        label: "Surise Time",
        data: [],
      },
    ],
  };

  return (
  <div>
    <Line data={data}
     height={300} width={400} />
     </div>
  )
};

export default Weatherforecast;
