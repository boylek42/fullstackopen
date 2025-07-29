const express = require('express')
const tideAPI = require('./services/tideApi')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT= process.env.PORT || 3001

const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('--')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error('Error: ', error.message)
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
app.get('/api/tide', (request, response, next) => {
  console.log('Making request to World Tides API...')
  console.log('API Key loaded:', process.env.API_KEY ? 'Yes' : 'No')
  console.log('API Key length:', process.env.API_KEY?.length || 'undefined')

  tideAPI.get('', {
    params: {
      extremes: '',
      lat: 53.45,
      lon: -6.15,
      date: 'today'
    }
  })
    .then(apiResponse => {
      console.log('API Response received successfully')
      const data = apiResponse.data

      response.json({
        location: { lat: 53.45, lon: -6.15 },
        extremes: data.extremes,
        data: data.date
      })
    })
    .catch(error => {
      console.log('Full error details:')
      console.log('Status:', error.response?.status)
      console.log('Status Text:', error.response?.statusText)
      console.log('Response data:', error.response?.data)
      console.log('Request URL:', error.config?.url)
      console.log('Request params:', error.config?.params)
      next(error)
    })
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`App running on port: ${PORT}`))