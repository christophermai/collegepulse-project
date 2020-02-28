import React from 'react'

import './style.css'

export default function KeySummaryStatistics(props) {
  const labels = props.formattedLabels
  const datasets = props.formattedData

  function findMostRecentlyPopular() {
    let mostRecentIdx = labels.length-1
    let highestPopularity = 0
    let mostPopularIdx = 0
    //for each dataset, find the one with the highest data[mostRecentIdx]
    for (let i = 0; i < datasets.length; i++) {
      let currentPopularity = datasets[i].data[mostRecentIdx]
      if (currentPopularity > highestPopularity) {
        highestPopularity = currentPopularity
        mostPopularIdx = i
      }
    }

    return datasets[mostPopularIdx].label
  }

  return (
    <div>
      <h1>Statistics</h1>
      <h3>Most/least popular as of most recent data:</h3>
      <p>{findMostRecentlyPopular()}</p>
      <h3>Rising star in popularity - Largest Growth:</h3>
      <h3>Candidate to watch out for - Fastest Growth:</h3>
    </div>
  )
}
