import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tide/'

const getData = (extension) => {
  let requestUrl = !extension ? `${baseUrl}` : `${baseUrl}${extension}`

  console.log(`Making request to ${requestUrl}`)
  const request = axios.get(`${requestUrl}`)
  return request.then(response => response.data)
}

const getDataByStation = (station) => {
  // Fixed URL construction - use & instead of second ?
  let requestUrl = `${baseUrl}current?lat=${station.lat}&lon=${station.lon}`

  console.log(`Making a request to: ${requestUrl} for station: ${station.name}`)
  const request = axios.get(`${requestUrl}`)
  return request.then(response => response.data)
}

export default { getData, getDataByStation }