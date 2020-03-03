import React from 'react'
import { Bar } from 'react-chartjs-2'

export default function DataVisualization(props) {
  const formattedData = {
    labels: props.formattedLabels,
    datasets: props.formattedData
  }

  return (
    <Bar
      data={formattedData}
      width={1200}
      height={500}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  )
}
