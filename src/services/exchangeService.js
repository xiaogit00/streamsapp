import axios from 'axios'

const exchange = (baseDenom, targetDenom) => {
    const url = `https://v6.exchangerate-api.com/v6/dd27d5921ad69597fd7c8815/pair/${baseDenom}/${targetDenom}`
    const response = axios.get(url)
    return response.then(res => res.data)
}

export default {
    exchange
}
