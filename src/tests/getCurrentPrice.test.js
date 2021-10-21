import currentPriceService from 'services/currentPriceService'
import exchangeService from 'services/exchangeService'

const getCurrentPrice = async () => {
    const baseDenom = 'USD'

    const stockPrice = await currentPriceService.fetchPriceForStock('aapl')
    const conversionRate = exchangeService.exchange(baseDenom, 'SGD')
    try {
        let values = await Promise.all([stockPrice, conversionRate])
        console.log('getCurrentPrice is enterted')
        const newPrice = values[0][0].open * values[1].conversion_rate
        console.log(newPrice)
    } catch (err) {
        console.log(err)
    }

}


test('getCurrentPrice succeeds', async () => {
    const coinId = 'bitcoin'
    const globalDenom = 'USD'
    await currentPriceService.fetchPriceForCrypto(coinId, globalDenom)
        .then(response => {
            console.log(response[coinId][globalDenom.toLowerCase()])
        })
})
