import React from 'react'
import Tooltip from './Tooltip'

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

  function findLargestGrowth() {
    //find the candidate with the largest positive difference between their most recent polling and least valued polling.
    let largestDifference = 0
    let largestDifferenceIdx = 0
    let mostRecentIdx = labels.length-1
    for (let i = 0; i < datasets.length; i++) { //each candidate
      let leastPoll = Number.MAX_SAFE_INTEGER
      for (let j = 0; j < datasets[i].data.length - 1; j++) {
        if (datasets[i].data[j] < leastPoll) {
          leastPoll = datasets[i].data[j]
        }
      }

      let difference = datasets[i].data[mostRecentIdx] - leastPoll
      if (difference > largestDifference) {
        largestDifference = difference
        largestDifferenceIdx = i
      }
    }

    return datasets[largestDifferenceIdx].label
  }

  function findFastestGrowth() {
    //find the candidate with the largest average slope in polling value over time.
  }

  return (
    <div>
      <h1>Statistics</h1>
      <h3>
        <span>
          Most Popular Now
          <Tooltip content={'Most popular as of most recent poll'} />
        </span>
      </h3>
      <p>{findMostRecentlyPopular()}</p>
      <h3>
        <span>
          Rising star in popularity - Largest Growth
          <Tooltip content={'Largest growth from their least popular polling to their most recent poll'} />
        </span>
      </h3>
      <p>{findLargestGrowth()}</p>
      <h3>
        <span>
          Candidate to watch out for - Fastest Growth
          <Tooltip content={'Fastest growth on average over the time range'} />
        </span>
      </h3>
    </div>
  )
}
