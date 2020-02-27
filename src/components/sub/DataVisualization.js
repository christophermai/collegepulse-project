import React, { Component } from 'react'

import './style.css'

export default class DataVisualization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      d3: ''
    }
  }

  componentDidMount() {
    this.setState({
      d3: node
    })
  }

  render() {
    return(
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    )
  }
}
