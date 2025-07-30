import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tide/'

const getDailyExtremes = () => {
    console.log(`Making request to ${baseUrl}`)
    const request = axios.get(baseUrl)
    return request.then(response => response.data.tides)
}

export default { getDailyExtremes }