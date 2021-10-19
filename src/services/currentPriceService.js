import axios from 'axios'
const CoinGecko = require('coingecko-api')
import interceptorService from 'services/interceptorService'

//Adding interceptors for my currentPrice Service



interceptorService.useAxiosRequestInterceptor()
interceptorService.useAxiosResponseInterceptor()

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
