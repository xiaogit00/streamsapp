import axios from 'axios'

const find = (assetName) => {
    const url = `/api/tickers/${assetName}`
    console.log('find is reached')
    const response = axios.get(url)
    return response.then(res => res.data)
}

export default {
    find
}
