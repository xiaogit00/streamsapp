//tradeService provides an interface for us to connect to database via the following abstraction:
//tradeService.getAll()

import axios from 'axios'
import interceptorService from 'services/interceptorService'

const baseURL = '/api/trades'
const token = localStorage.getItem('token')


const getAll = async () => {

    const response = await axios.get(baseURL, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.data
}

const createNew = async (content) => {
    console.log('token within tradeServices', token)
    const response = await axios.post(baseURL, content, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.data
}

const deleteTrade = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

const updateTrade = async (id, newTrade) => {
    console.log('hi from within trades service: this is the URL:', `${baseURL}/${id}`)
    const response = await axios.put(`${baseURL}/${id}`, newTrade, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

const toggleTradeAssignment = async (id) => {
    const response = await axios.put(`${baseURL}/${id}`, {assigned: false}, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

export default { getAll,
    createNew,
    deleteTrade,
    updateTrade,
    toggleTradeAssignment
}
