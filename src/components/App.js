import React, { Component } from 'react'
import { Grid, Menu, Button, Loader } from 'semantic-ui-react'
import axios from 'axios'

import DataVisualization from './sub/DataVisualization.js'
import KeySummaryStatistics from './sub/KeySummaryStatistics.js'

import './style.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'home',
      loading: true,
      formattedLabels: [],
      formattedData: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios('https://api.myjson.com/bins/bxobk').then(response => {
      this.setState({
        loading: false,
        formattedLabels: this.formatLabels(response.data),
        formattedData: this.formatDataSets(response.data)
      })
    })
  }

  formatLabels(data) {
    let labels = []
    for (let i = 1; i < data[0].length; i++) {
      labels.push(data[0][i][0])
    }
    return labels
  }
  
  formatNumbers(data, i) {
    let numbers = data[0].map(dataSet => dataSet[i])
    numbers.shift()
    return numbers
  }

  formatDataSets(data) {
    let datasets = data[0][0].map((dataSet, i) => {
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
        data: this.formatNumbers(data, i)
      }
    })
    datasets.shift()
    return datasets
  }

  views() {
    return {
      home: <DataVisualization
          formattedLabels={this.state.formattedLabels}
          formattedData={this.state.formattedData}
      />,
      keySummaryStatistics: <KeySummaryStatistics
          formattedLabels={this.state.formattedLabels}
          formattedData={this.state.formattedData}
      />
    }
  }

  changeViews(view) {
    this.setState({
      view: view,
    }, () => {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    })
  }

  render() {
    const { view, loading } = this.state
    const isButtonSelected = (view, viewName) => {
      return view === viewName ? 'selected' : null
    }

    return (
      <div>
        <div>
          <Menu borderless fluid fixed={'top'}>
            <Menu.Item
              name='Data Visualization'
              active={view === 'home'}
              onClick={() => this.changeViews('home')}
            >
              Data Visualization
            </Menu.Item>
            <Menu.Item
              name='Key Summary Statistics'
              active={view === 'keySummaryStatistics'}
              onClick={() => this.changeViews('keySummaryStatistics')}
            >
              Key Summary Statistics
            </Menu.Item>
            <Menu.Item position='right'>
              <Button color={'teal'} floated='right' onClick={() => this.getData()}>
                Refresh Data
              </Button>
            </Menu.Item>
          </Menu>
        </div>
        {
          loading ?
            <Loader />
            :
            <div className='dashboard'>
              {
                this.views()[view]
              }
            </div>
        }
      </div>
    )
  }
}