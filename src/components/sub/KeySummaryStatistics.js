import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import './style.css'

export default class KeySummaryStatistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return(
      <div>
        <h1>Statistics</h1>
        //Most/least popular as of most recent data
        //Rising star in popularity - largest growth
        //Candidate to watch out for - fastest growth
      </div>
    )
  }
}
