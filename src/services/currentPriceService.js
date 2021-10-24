import axios from 'axios'
const CoinGecko = require('coingecko-api')
import interceptorService from 'services/interceptorService'

//Adding interceptors for my currentPrice Service


const token = localStorage.getItem('token')



const fetchPriceForStock = (ticker) => {
    console.log('currentPriceService is entered')
    const fetchCurrentStockPriceURL = `/api/streams/currentstockprice/${ticker}`
    // interceptorService.useAxiosRequestInterceptor()
    // interceptorService.useAxiosResponseInterceptor()
    const response = axios.get(fetchCurrentStockPriceURL, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.then(res => {
        console.log(`[CurrenPriceService] response for ${ticker} is fetched, and it is:`, res.data)

        return res.data
    } ).catch(err => {
        console.log(`There is an error in fetching for ${ticker}, the error is: `, err)

    })
    // const price = response.data[0].open
    // console.log('price received: ', price)
    // return price
}

// const fetchPriceForCrypto = async (ticker, base) => {
//     const
// }

// const fetchPriceForETF = (ticker) => {
//
//     var options = {
//         method: 'GET',
//         url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
//         params: {symbol: ticker, region: 'US'},
//         headers: {
//             'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
//             'x-rapidapi-key': '26bba5edbcmshd0431d7b9b7d5f9p180f33jsn8e45abafe4b1'
//         }
//     }
//
//     const response = axios.request(options)
//     return response.then(res => res.data)
// }



const fetchPriceForCrypto = (coinId, baseCurrency) => {
    const fetchCurrentCryptoPriceURL = `/api/streams/currentcryptoprice/${coinId}/${baseCurrency}`

    const response = axios.get(fetchCurrentCryptoPriceURL, {
        headers: {
            Authorization:`bearer ${token}`
        }
    })
    return response.then(res => {
        console.log(`response for ${coinId} is fetched, and it is:`, res.data)

        return res.data
    } ).catch(err => {
        console.log(`There is an error in fetching for ${coinId}, the error is: `, err)
    })
}



export default {
    fetchPriceForStock,
    fetchPriceForCrypto
}
