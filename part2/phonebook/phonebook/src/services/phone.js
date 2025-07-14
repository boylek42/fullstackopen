import axios from 'axios' 
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return (request.then(response => response.data))
}

const create = (newContact) => {
    const request = axios.post(baseUrl, newContact)
    return (request.then(response => response.data))
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, updatedContact) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedContact)
    return(request.then(response => response.data))
}

export default {
    getAll,
    create,
    remove,
    updateContact
}
