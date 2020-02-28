import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import './style.css'

export default class DataVisualization extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const formattedData = {
      labels: this.props.formattedLabels,
      datasets: this.props.formattedData
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
}
