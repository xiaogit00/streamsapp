import currentPriceService from 'services/currentPriceService'

test('test for currentPriceService', async () => {
    const response = await currentPriceService.fetchPriceForStock('0700.XHKG')
    console.log(response)
})
