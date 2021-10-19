import axios from 'axios'

const find = (coinSymbol) => {
    const url = `http://localhost:3003/api/coins/${coinSymbol}`
    console.log('find is reached')
    const response = axios.get(url)
    return response.then(res => res.data)
}

const get = () => {
    const url = 'http://localhost:3003/api/coins'
    console.log('find is reached')
    const response = axios.get(url)
    return response.then(res => res.data)
}

export default {
    find,
    get
}
