import axios from 'axios'
import { cache } from 'services/cacheHandler'

const whiteList = [
    'api.marketstack.com',
    'v6.exchangerate-api.com',
    'api.coingecko.com',
    'yh-finance.p.rapidapi.com'
]
function isURLInWhiteList(url) {
    return whiteList.includes(url.split('/')[2])
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
    console.log('serving fresh from API, request: ', request)
    return request
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
    console.log('error object:', error)
    if (error.headers.cached === true) {
        console.log('got cached data in response, serving it directly')
        return Promise.resolve(error)
    }
    return Promise.reject(error)
}

const useAxiosRequestInterceptor = () => axios.interceptors.request.use(request => requestHandler(request))

const useAxiosResponseInterceptor = () => {
    return (
        axios.interceptors.response.use(
            response => responseHandler(response),
            error => errorHandler(error)
        )
    )
}

const ejectAxiosRequestInterceptor = () => axios.interceptors.request.eject(useAxiosRequestInterceptor())

const ejectAxiosResponseInterceptor = () => axios.interceptors.response.eject(useAxiosResponseInterceptor())

export default {
    useAxiosRequestInterceptor,
    useAxiosResponseInterceptor,
    ejectAxiosRequestInterceptor,
    ejectAxiosResponseInterceptor
}
