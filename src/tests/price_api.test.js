//**********************************************************
//*                     Initial Problem Analysis
//**********************************************************
// I'll need to make a connection to alphaVantage API and get the price
// I want to define a function getCurrentPrice(Ticker, assetClass) that will call alphaVantage API and return the price.
// Then, I want to test different APIs and ways of getting the kind of prices that I want.


// China Stocks
// Crypto
// US Equities
// import axios from 'axios'
// const globalNominalDenom = 'USD'
//

//
// const getCurrentPrice = (ticker, assetClass) => {
//     switch (assetClass) {
//     case 'crypto': {
//         alpha.forex.rate('BTC', 'USD').then(res => {
//             console.log(res['Realtime Currency Exchange Rate']['5. Exchange Rate'])
//             return null
//         })
//     }
//     case 'chinaEquities': {
//
//     }
//     case 'stocks': {
//         alpha.data.intraday(ticker).then(data => {
//             console.log(data)
//         })
//     }
//     default:
//         return 'Price not found'
//     }
// }
// const url = 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=FB'
// test('Get price', async () => {
//     const data = await axios.get(url).then(res => res.data)
//     console.log(data)
// })
//**********************************************************
//*                     Alpha Vantage API
//**********************************************************
// const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' })
//CRYPTO
// test('alphaVantage', async() => {
//     const data = await alpha.forex.rate('BTC', 'USD').then(res => res)
//     console.log(data)
// })
// 928ms

//STOCKS
// test('alphaVantage', async () => {
//     const data = await alpha.data.quote('MSFT').then(res => res)
//     console.log(data)
// })

//1095ms

//**********************************************************
//*                     MarketStack API
//**********************************************************
// import axios from 'axios'
// const url = 'https://api.marketstack.com/v1/tickers?limit=10000?access_key=0221109a31d8e5eb503908abf0c40e17'
// test('marketplace', async () => {
//     const data = await axios.get(url).then(res => res.data)
//     console.log(data)
// })
//858ms
//**********************************************************
//*                     YAHOO FINANCE API
//**********************************************************
//
// var yahooFinance = require('yahoo-finance')
//
// test('yahoo', async () => {
//     const data = await yahooFinance.quote({
//         symbol: 'HST.SI',
//         modules: [ 'price'] // see the docs for the full list
//     }, function (err, quotes) {
//         // ...
//     })
//     console.log(data.price.regularMarketPrice)
//
// })
//1266ms

//**********************************************************
//*                    Test currentPriceService
//**********************************************************
// import currentPriceService from 'services/currentPriceService'
//
// test('test', async () => {
//     const data = await currentPriceService.fetchPriceForStock('0700.XHKG')
//     console.log('data', data)
// })


//**********************************************************
//*                    RapidAPI Yahoo Finance service
//**********************************************************

// var axios = require('axios').default
//
// var options = {
//     method: 'GET',
//     url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
//     params: {symbol: 'HST.SI', region: 'US'},
//     headers: {
//         'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
//         'x-rapidapi-key': '26bba5edbcmshd0431d7b9b7d5f9p180f33jsn8e45abafe4b1'
//     }
// }
// test('price', async () => {
//     await axios.request(options).then(function (response) {
//         console.log(response.data.price.currency)
//     }).catch(function (error) {
//         console.error(error)
//     })
// })


//**********************************************************
//*                CoinGecko API
//**********************************************************

// const CoinGecko = require('coingecko-api')
// const CoinGeckoClient = new CoinGecko()
//
// test('coinGecko', async () => {
//     const data = await CoinGeckoClient.simple.price({
//         ids: ['ethereum']
//     })
//     // OR: (if you want to put Currencies - by default, it's US)
//     //     let data = await CoinGeckoClient.simple.price({
//     //     ids: ['ethereum'],
//     //     vs_currencies: ['eur'],
//     // });
//     console.log(data.data.ethereum)
// })

//**********************************************************
//*               Exchange Rate API
//**********************************************************

// import exchangeService from 'services/exchangeService'
//
// test('test', async () => {
//     const newPrice = await exchangeService.exchange(161.3, 'HKD', 'SGD')
//     console.log('newPrice',newPrice)
// })
