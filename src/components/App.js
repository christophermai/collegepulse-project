import React, { Component } from 'react'
import { Grid, Menu, Button, Loader, MenuItem } from 'semantic-ui-react'

import DataVisualization from './sub/DataVisualization.js'
import KeySummaryStatistics from './sub/KeySummaryStatistics.js'

import './style.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'home',
      loading: false,
      data: [
        [
          [
            "All",
            "Bernie Sanders",
            "Joe Biden"
          ],
          [
            "26-March",
            "33",
            "22"
          ],
          [
            "02-April",
            "34",
            "23"
          ]
        ]
      ]
    }
  }

  componentDidMount() {
  }

  views() {
    return {
      home: <DataVisualization
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
    const { loading, view } = this.state
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
              <Button color={'teal'} floated='right' onClick={() => {
              
              }}>
                Refresh Data
              </Button>
            </Menu.Item>
          </Menu>
        </div>

        {loading ?
          <Loader/>
          :
          <div className='dashboard'>
            <Grid>
              {
                this.views()[view]
              }
            </Grid>
          </div>
        }
      </div>
    )
  }
}