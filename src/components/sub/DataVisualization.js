import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import './style.css'

export default class DataVisualization extends Component {
  constructor(props) {
    super(props)
  }

  formatLabels() {
    let labels = []
    for (let i = 1; i < this.props.data[0].length; i++) {
      labels.push(this.props.data[0][i][0])
    }
    return labels
  }
  
  formatNumbers(i) {
    let numbers = this.props.data[0].map(dataSet => dataSet[i])
    numbers.shift()
    return numbers
  }

  formatDataSets() {
    let datasets = this.props.data[0][0].map((dataSet, i) => {
      let r = Math.random()*200
      let g = Math.random()*200
      let b = Math.random()*200
      return {
        label: dataSet,
        backgroundColor: `rgba(${r},${g},${b},0.2)`,
        borderColor: `rgba(${r},${g},${b},1)`,
        borderWidth: 1,
        hoverBackgroundColor: `rgba(${r},${g},${b},0.4)`,
        hoverBorderColor: `rgba(${r},${g},${b},1)`,
        data: this.formatNumbers(i)
      }
    })
    datasets.shift()
    return datasets
  }


  render() {
    const formattedData = {
      labels: this.formatLabels(),
      datasets: this.formatDataSets()
    }
    return(
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
