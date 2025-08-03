import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tide/'

const getData = (extension) => {
    const requestUrl = !extension ? `${baseUrl}` : `${baseUrl}${extension}`
    console.log(`Making request to ${requestUrl}`)
    const request = axios.get(`${requestUrl}`)
    return request.then(response => response.data)
}

export default { getData }