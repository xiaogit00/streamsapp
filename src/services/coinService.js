import axios from 'axios'

const find = async (coinSymbol) => {
    const url = `/api/coins/${coinSymbol}`
    console.log('find is reached, and the coinSymbol is:', coinSymbol)
    const response = await axios.get(url)
    console.log('this is the response.data from within coinService:', response.data)
    return response.data
}

const get = async () => {
    const url = '/api/coins'
    console.log('find is reached')
    const response = await axios.get(url)
    return response.data
}

export default {
    find,
    get
}
