import React from 'react'
import currentPriceService from 'services/currentPriceService'
import interceptorService from 'services/interceptorService'

const TestCacheButton = () => {

    const buttonHandler = async () => {
        interceptorService.useAxiosRequestInterceptor()
        interceptorService.useAxiosResponseInterceptor()
        try {
            // const response = await currentPriceService.fetchPriceForStock('AAPL')
            const response = await currentPriceService.fetchPriceForCrypto('bitcoin','USD')
            console.log(response)
        } catch (err) {
            console.log('There is an error')
            console.log(err)
        }


    }

    return (
        <>
            <button onClick={buttonHandler}>Test Cache Button</button>
        </>
    )
}

export default TestCacheButton
