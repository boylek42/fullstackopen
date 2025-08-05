const express = require('express')
const tideAPI = require('./services/tideApi')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config( { path: '../.env' })

const app = express()
const PORT= process.env.PORT || 3001

const requestLogger = (request, response, next) => {
  console.log('Request Logger:')
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('--')
  next()
}

// const errorHandler = (error, request, response, next) => {
//   console.log('Full error details:')
//   console.error('Status:', error.response?.status)
//   console.error('Status Text:', error.response?.statusText)
//   console.error('Response data:', error.response?.data)
//   console.error('Request URL:', error.config?.url)
//   console.error('Request params:', error.config?.params)
//   console.log('--')

//   if(error.response) {
//     return response.status(502).json({ error: 'Bad Gateway: Tidal API returned an error' })
//   }
//   else if (error.request) {
//     return response.status(503).json({ error: 'Service Unavailable: No response from Tidal API' })
//   }
//   return response.status(500).json({ error: 'Unexpected error while fetching Tidal data.' })
// }

app.use(requestLogger)

// ROUTES
// Route for current tide height
app.get('/api/tide/current', cors(), (request, response, next) => {
  // console.log('Making request to World Tides API for today\'s tide data...')
  // console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No')
  // console.log('API Key length:', process.env.API_KEY?.length || 'undefined')

  const now = new Date()
  const currentDateTime = new Date()

  tideAPI.get('', {
    params: {
      heights: '',  // Parameter for getting height data
      lat: 53.45,
      lon: -6.15,
      datum: 'CD',
      // Today's Extremes:
      extremes: '',
      date: 'today',
    }
  })
    .then(apiResponse => {
      console.log('API Response received successfully')
      console.log('Response data structure:', Object.keys(apiResponse.data))
      const today = now.toISOString().split('T')[0]

    //   console.log(apiResponse.data)
      const currentHeight = getCurrentHeightSimple(apiResponse.data, currentDateTime)
      const dailyExtremes = processTideData(apiResponse.data, today)
      console.log(`Current Height: ${currentHeight}, Daily Extremes: ${dailyExtremes}`)
      response.json({currentHeight, dailyExtremes})
    })
    // .catch(error => next(error))
})


// Route without date parameter (defaults to today)
app.get('/api/tide', cors(), (request, response, next) => {
  console.log('Making request to World Tides API...')
  console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No')
  console.log('API Key length:', process.env.API_KEY?.length || 'undefined')

  const requestedDate = new Date()// Default to today

  tideAPI.get('', {
    params: {
      extremes: '',
      lat: 53.45,
      lon: -6.15,
      date: requestedDate,
      days: 7,
      datum: 'CD'
    }
  })
    .then(apiResponse => {
      console.log('API Response received successfully')
      const processedData = processTideData(apiResponse.data, requestedDate)
      response.json(processedData)
    })
    .catch(error => next(error))
})

// Route with date parameter
app.get('/api/tide/:date', cors(), (request, response, next) => {
  console.log('Making request to World Tides API...')
  console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No')
  console.log('API Key length:', process.env.API_KEY?.length || 'undefined')

  const requestedDate = request.params.date

  tideAPI.get('', {
    params: {
      extremes: '',
      lat: 53.45,
      lon: -6.15,
      date: requestedDate,
      days: 7,
      datum: 'CD',
      timezone: 'auto'
    }
  })
    .then(apiResponse => {
      console.log('API Response received successfully')
      const processedData = processTideData(apiResponse.data, requestedDate)
      response.json(processedData)
    })
    .catch(error => {
      next(error)
    })
})

// Alternative approach using the current time directly (simpler but less precise)
const getCurrentHeightSimple = (data, currentTime) => {
  if (!data.heights || data.heights.length === 0) {
    return {
      error: 'No height data available',
      location: data.station || 'Unknown location.',
      requestTime: currentTime
    }
  }

  // Find the timestamp closest to the current time.
  const now = new Date()
  console.log(`Now: ${now}`)
  let closest = data.heights[0]
  let minDiff = Math.abs(now - new Date(closest.dt * 1000))
  data.heights.forEach(h => {
    const diff = Math.abs(now - new Date(h.dt * 1000))
    if (diff < minDiff) {
      closest = h
      minDiff = diff
    }
  })

  console.log(`Current Height is: ${parseFloat(closest.height.toFixed(2))}`)
  return {
    location: data.station || 'Unknown Location',
    currentTime: currentTime,
    height: parseFloat(closest.height.toFixed(2)),
    timestamp: new Date(closest.dt * 1000).toISOString()
  }
}

// Format response from API
const processTideData = (data, targetDate) => {
  const tidesByDay = {}
  data.extremes.forEach(extreme => {
    const date = extreme.date.split('T')[0]
    if(!tidesByDay[date]) {
      tidesByDay[date] = {
        day: date,
        highs: [],
        lows: []
      }
    }

    // Get Tidal Info: time, height and current date.
    const tideInfo = {
      time: extreme.date.split('T')[1].substring(0, 5),
      height: extreme.height !== null ? parseFloat(extreme.height.toFixed(2)) : null,
      fullDateTime: extreme.date
    }

    if(extreme.type === 'High') {
      tidesByDay[date].highs.push(tideInfo)
    }
    else {
      tidesByDay[date].lows.push(tideInfo)
    }
  })

  const dayData = tidesByDay[targetDate] || {
    date: targetDate,
    highs: [],
    lows: []
  }

  return {
    location: data.lon,
    currentDate: targetDate,
    tides: dayData,
    availableDates: Object.keys(tidesByDay).sort(),
  }
}

// app.use(errorHandler)
app.listen(PORT, () => console.log(`App running on port: ${PORT}`))