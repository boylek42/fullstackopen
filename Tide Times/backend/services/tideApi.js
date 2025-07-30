require('dotenv').config({ path: '../.env' })
const axios = require('axios')

const tideAPI = axios.create({
  baseURL: 'https://www.worldtides.info/api/v3',
  params: {
    key: process.env.API_KEY
  }
})

module.exports = tideAPI