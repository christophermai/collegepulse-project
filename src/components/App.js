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
      data: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    return axios('https://api.myjson.com/bins/bxobk').then((response) => {
      this.setState({
        loading: false,
        data: response.data
      })
    })
  }

  views() {
    return {
      home: <DataVisualization data={this.state.data}
      />,
      keySummaryStatistics: <KeySummaryStatistics
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