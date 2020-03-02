#Getting Started

## Make sure these are installed
- node package manager

## Setup
- clone repository
- go into the cloned repo and run
$npm install
$npm run build
$npm run start
- A new browser window should open to localhost:8080

#Code Structure
- /dist contains distributable files generated by webpack
- /node_modules contains node package files and their dependencies
- /src is where the app code lives and the entry files
- /src/components are where the components live
- /src/components/sub are where the child components for the root component of our single-page application live

#Technical Decisions

## Framework
I chose React because I like React and I wanted to practice my React skills a bit. React is also great for single-page web applications.

## Data Visualization library
In my React app, I could not use D3 because
1) D3 manipulates the real DOM
3) Tried using react-d3-library, but it uses a babel plugin my version of babel does not recognize.
I decided to use react-char-js2 based on Chart.js because I've used it before without any issues.

However, there are drawbacks with using Chart.js with this dataset.
1) Readability: If the dataset gets large (more candidates or larger timescale), the bars get very thin, cluttered, and hard to read, but thankfully you can filter the bars so that helps mitigate this issue a bit.
  D3.js would solve this better by having a bubble chart that renders a good sized pie chart for each timeframe.


#Testing our Results
1) I console.logged the raw data and console.logged the data after it had been formatted and ready to be fed into the data visualization library. Then I compared the two to ensure the data is displayed in the graph correctly.

#Future Ideas
1) Key Summary Statistics is always welcome to more ways to interpret the data. Styling is also far from complete here.

#Getting Ready for Production
1) The bundle.js from webpack is above the recommended size. I would look into implementing code-splitting features of webpack to lazy load the application.
