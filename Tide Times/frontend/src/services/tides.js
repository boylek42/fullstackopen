import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/tide/'

const getData = (extension) => {
    let requestUrl = !extension ? `${baseUrl}` : `${baseUrl}${extension}`
    
    // if(lat && lon) {
    //     requestUrl += `?lat=${lat}&lon=${lon}`
    // } 

    console.log(`Making request to ${requestUrl}`)
    const request = axios.get(`${requestUrl}`)
    return request.then(response => response.data)
}

// const sendStationData = (station) => {
//     const requestUrl = `${baseUrl}station`
//     const request = axios.post(`${requestUrl}`, station)
//     return request.then(response => response.data)
// }
// lat = null, lon = null

export default { getData }