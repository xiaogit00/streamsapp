import axios from 'axios'
import { cache } from 'services/cacheHandler'

const whiteList = [
    'shielded-reaches-54541.herokuapp.com',
    'v6.exchangerate-api.com',
    'streams'
]
function isURLInWhiteList(url) {
    return whiteList.includes(url.split('/')[2])
}

function requestHandler(request) {
    console.log('RequestHandler is triggered and the request object is:', request)
    if (request.method === 'GET' || 'get') {
        var checkIsValidResponse = cache.isValid(request.url || '')
        if (checkIsValidResponse.isValid) {
            console.log('[RequestHandler-InterceptorService] serving cached data:')
            request.headers.cached = true
            request.data = JSON.parse(checkIsValidResponse.value || '{}')
            console.log('cached data:', request.data)
            return Promise.reject(request)
        }
    }
    console.log('serving fresh from API, request: ', request)
    return request
}

function responseHandler(response) {
    console.log('ResponseHandler is triggered and the response object is:', response)
    if (response.config) {
        if (response.config.method === 'GET' || 'get') {
            console.log('[ResponseHandler-InterceptorService]', response)
            if (response.config.url && isURLInWhiteList(response.config.url)) {
                console.log('[ResponseHandler-InterceptorService]storing in cache')
                cache.store(response.config.url, JSON.stringify(response.data))
            }
        }
    }

    return response
}

function errorHandler(error) {
    // console.log('[ErrorHandler-InterceptorService] error.headers.cached:', error.headers.cached)
    if (error.headers.cached) {
        if (error.headers.cached === true) {
            console.log('[ErrorHandler-InterceptorService] got cached data in response, serving it directly: ', error)
            return Promise.resolve(error)
        }
    }

    return Promise.reject(error)
}

const useAxiosRequestInterceptor = () => {
    console.log('axios request interceptor is mounted')
    axios.interceptors.request.use(request => requestHandler(request))
}

const useAxiosResponseInterceptor = () => {
    console.log('axios response interceptor is mounted')
    return (
        axios.interceptors.response.use(
            response => responseHandler(response),
            error => errorHandler(error)
        )
    )
}

const ejectAxiosRequestInterceptor = () => {
    console.log('axios request interceptor is unmounted')
    axios.interceptors.request.eject(useAxiosRequestInterceptor)
}


const ejectAxiosResponseInterceptor = () => {
    console.log('axios response interceptor is unmounted')
    axios.interceptors.response.eject(useAxiosResponseInterceptor)
}

export default {
    useAxiosRequestInterceptor,
    useAxiosResponseInterceptor,
    ejectAxiosRequestInterceptor,
    ejectAxiosResponseInterceptor
}
