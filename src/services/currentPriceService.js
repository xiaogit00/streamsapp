import axios from 'axios'
const CoinGecko = require('coingecko-api')
import { cache } from 'services/cacheHandler'

//Adding interceptors for my currentPrice Service

const whiteList = [
    'api.marketstack.com',
    'v6.exchangerate-api.com',
    'api.coingecko.com',
    'yh-finance.p.rapidapi.com'
]
function isURLInWhiteList(url) {
    return whiteList.includes(url.split('/')[2])
}


function responseHandler(response) {
    if (response.config.method === 'GET' || 'get') {

        if (response.config.url && isURLInWhiteList(response.config.url)) {
            console.log('storing in cache')
            cache.store(response.config.url, JSON.stringify(response.data))
        }
    }
    return response
}

function errorHandler(error) {
    // console.log('error object:', error)
    if (error.headers.cached === true) {
        console.log('got cached data in response, serving it directly')
        return Promise.resolve(error)
    }
    return Promise.reject(error)
}

function requestHandler(request) {
    if (request.method === 'GET' || 'get') {
        var checkIsValidResponse = cache.isValid(request.url || '')
        if (checkIsValidResponse.isValid) {
            console.log('serving cached data')
            request.headers.cached = true
            request.data = JSON.parse(checkIsValidResponse.value || '{}')
            return Promise.reject(request)
        }
    }
    console.log('serving fresh from API')
    return request
}

axios.interceptors.request.use(request => requestHandler(request))

axios.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error)
)

const marketStackToken = '0221109a31d8e5eb503908abf0c40e17'

const fetchPriceForStock = (ticker) => {
    console.log('currentPriceService is entered')
    const marketStackURL = `https://api.marketstack.com/v1/eod/latest?access_key=${marketStackToken}&symbols=${ticker}`
    const response = axios.get(marketStackURL)
    return response.then(res => res.data)
    // const price = response.data[0].open
    // console.log('price received: ', price)
    // return price
}

// const fetchPriceForCrypto = async (ticker, base) => {
//     const
// }

const fetchPriceForETF = (ticker) => {

    var options = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
        params: {symbol: ticker, region: 'US'},
        headers: {
            'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
            'x-rapidapi-key': '26bba5edbcmshd0431d7b9b7d5f9p180f33jsn8e45abafe4b1'
        }
    }

    const response = axios.request(options)
    return response.then(res => res.data)
}



const fetchPriceForCrypto = (coinId, baseCurrency) => {
    const coinGeckoURL = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${baseCurrency}`
    const response = axios.get(coinGeckoURL)
    // const CoinGeckoClient = new CoinGecko()
    //
    // const response = CoinGeckoClient.simple.price({
    //     ids: [coinId],
    //     vs_currencies: [baseCurrency]
    // })
    // console.log('response', response)
    return response.then(res => res.data)
}

export default {
    fetchPriceForStock,
    fetchPriceForETF,
    fetchPriceForCrypto
}
