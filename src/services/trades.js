//tradeService provides an interface for us to connect to database via the following abstraction:
//tradeService.getAll()

import axios from 'axios'

const baseURL = 'http://localhost:3003/api/trades'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (content) => {
    const response = await axios.post(baseURL, content)
    return response.data
}

const deleteTrade = async (id) => {
    const response = await axios.delete(`${baseURL}/${id}`)
    return response.status
}

const updateTrade = async (id, newTrade) => {
    const response = await axios.put(`${baseURL}/${id}`, newTrade)
    return response.status
}

export default { getAll,
    createNew,
    deleteTrade,
    updateTrade}
