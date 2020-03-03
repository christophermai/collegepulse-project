import React from 'react'
import Tooltip from './Tooltip'

export default function KeySummaryStatistics(props) {
  const MONTHS = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 8,
    'October': 9,
    'November': 10,
    'December': 11
  }
  const labels = props.formattedLabels
  const datasets = props.formattedData

  function findMostRecentlyPopular() {
    //find the candidate with the highest polling value on the most recently sampled date
    let mostRecentPoll = labels.length-1
    let highestPopularity = 0
    let mostPopularIdx = 0
    for (let i = 0; i < datasets.length; i++) {
      let currentPopularity = datasets[i].data[mostRecentPoll]
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
    for (let i = 0; i < datasets.length; i++) { //each candidate
      let leastPoll = Number.MAX_SAFE_INTEGER
      for (let j = 0; j < datasets[i].data.length - 1; j++) {
        if (datasets[i].data[j] < leastPoll) {
          leastPoll = datasets[i].data[j]
        }
      }

      let mostRecentPoll = labels.length - 1
      while (datasets[i].data[mostRecentPoll] === NaN) {
        if (datasets[i].data[mostRecentPoll] === NaN) {
          mostRecentPoll--
        }
      }

      let difference = datasets[i].data[mostRecentPoll] - leastPoll
      if (difference > largestDifference) {
        largestDifference = difference
        largestDifferenceIdx = i
      }
    }

    return datasets[largestDifferenceIdx].label
  }

  function findFastestGrowth() {
    //find the candidate with the largest overall slope in polling value over time.
    //slope = rise / run
    //rise = mostRecentPoll - oldestPoll
    //run = mostRecentDate - oldestDate
    let fastestGrowth = 0
    let fastestGrowthIdx = 0
    for (let i = 0; i < datasets.length; i++) {
      let mostRecentPoll = labels.length - 1
      let oldestPoll = 0
      while (datasets[i].data[mostRecentPoll] === NaN || datasets[i].data[oldestPoll] === NaN) {
        if (datasets[i].data[mostRecentPoll] === NaN) {
          mostRecentPoll--
        }
        if (datasets[i].data[oldestPoll] === NaN) {
          oldestPoll++
        }
      }

      let rise = datasets[i].data[mostRecentPoll] - datasets[i].data[oldestPoll]

      let dateDay1 = labels[oldestPoll].substring(0, 2)
      let dateMonth1 = labels[oldestPoll].substring(3)
      let date1 = new Date(2019, MONTHS[dateMonth1], dateDay1)
      let dateDay2 = labels[mostRecentPoll].substring(0, 2)
      let dateMonth2 = labels[mostRecentPoll].substring(3)
      let date2 = new Date(2019, MONTHS[dateMonth2], dateDay2)
      let run = dateDiffDays(date1, date2)
      let growth = rise / run
      if (growth > fastestGrowth) {
        fastestGrowth = growth
        fastestGrowthIdx = i
      }
    }

    return datasets[fastestGrowthIdx].label
  }

  function dateDiffDays(date1, date2) { //date1 = older date, date2 = newer date
    return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
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
      <p>{findFastestGrowth()}</p>
    </div>
  )
}
