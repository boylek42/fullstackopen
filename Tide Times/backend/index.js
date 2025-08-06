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

const errorHandler = (error, request, response, next) => {
  console.log('Full error details:')
  console.error('Status:', error.response?.status)
  console.error('Status Text:', error.response?.statusText)
  console.error('Response data:', error.response?.data)
  console.error('Request URL:', error.config?.url)
  console.error('Request params:', error.config?.params)
  console.log('--')

  if(error.response) {
    return response.status(502).json({ error: 'Bad Gateway: Tidal API returned an error' })
  }
  else if (error.request) {
    return response.status(503).json({ error: 'Service Unavailable: No response from Tidal API' })
  }
  return response.status(500).json({ error: 'Unexpected error while fetching Tidal data.' })
}

app.use(requestLogger)

// ROUTES
// Route for current tide height
app.get('/api/tide/current', cors(), (request, response, next) => {
  const {lat, lon} = request.query
  const now = new Date()
  const currentDateTime = new Date()

  tideAPI.get('', {
    params: {
      heights: '',  // Parameter for getting height data
      lat: parseFloat(lat),    // ← Use query parameter
      lon: parseFloat(lon),
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

      console.log(apiResponse.data)
      const currentHeight = getCurrentHeight(apiResponse.data, currentDateTime)
      const dailyExtremes = processTideData(apiResponse.data, today)
      console.log(`Current Height: ${currentHeight}, Daily Extremes: ${dailyExtremes}`)
      response.json({currentHeight, dailyExtremes})
    })
})

const getCurrentHeight = (data, currentTime) => {
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

app.use(errorHandler)
app.listen(PORT, () => console.log(`App running on port: ${PORT}`))