//tradeService provides an interface for us to connect to database via the following abstraction:
//tradeService.getAll()

import axios from 'axios'
import interceptorService from 'services/interceptorService'

const baseURL = 'http://localhost:3003/api/trades'
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
    interceptorService.ejectAxiosRequestInterceptor()
    interceptorService.ejectAxiosResponseInterceptor()
    const response = await axios.post(baseURL, content, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.data
}

const deleteTrade = async (id) => {
    interceptorService.ejectAxiosRequestInterceptor()
    interceptorService.ejectAxiosResponseInterceptor()
    const response = await axios.delete(`${baseURL}/${id}`, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

const updateTrade = async (id, newTrade) => {
    const response = await axios.put(`${baseURL}/${id}`, newTrade, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.status
}

export default { getAll,
    createNew,
    deleteTrade,
    updateTrade}
