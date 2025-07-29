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

  // Next is not required: no need to pass control onto next middleware (none exist)
  // next()
}

app.use(requestLogger)

// ROUTES
app.get('/api/tide', (request, response, next) => {
  console.log('Making request to World Tides API...')

  tideAPI.get('', {
    params: {
      heights: '',
      lat: 53.45,
      lon: -6.15,
      date: 'today'
    }
  })
    .then(apiResponse => {
      console.log('Making request to World Tides API... 2')
      response.json(apiResponse.data)
    }
    )
    .catch(error => next(error))
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`App running on port: ${PORT}`))