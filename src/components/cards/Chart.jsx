import React from 'react'
import { LineChart ,XAxis ,Tooltip,CartesianGrid,Line,YAxis} from 'recharts'
const Chart = ({title,data1,dataKey,grid}) => {
  const data =[
      {
          name: "Jan",
          "Active User": 4000,
      },
      {
          name: "Feb",
          "Active User": 3000,
      },
      {
          name: "Mar",
          "Active User": 5000,
      },
      {
          name: "Apr",
          "Active User": 4000,
      },
      {
          name: "May",
          "Active User": 3000,
      },
      {
          name: "Jun",
          "Active User": 2000,
      },
      {
          name: "Jul",
          "Active User": 4000,
      },
      {
          name: "Agu",
          "Active User": 3000,
      },
      {
          name: "Sep",
          "Active User": 4000,
      },
      {
          name: "Oct",
          "Active User": 1000,
      },
      {
          name: "Nov",
          "Active User": 4000,
      },
      {
          name: "Dec",
          "Active User": 3000,
      },
  ]
  return (
  
          <LineChart width={370} height={300} data={data}>
              <XAxis dataKey="name" stroke='#511' />
          <YAxis dataKey={"Active User"} stroke='#511' />
              <Line type="monotone" dataKey="name" stroke="#511" />
              <Line type="monotone" dataKey="Active User" stroke="#511" />
          </LineChart>


         
  
     
  )
}

export default Chart