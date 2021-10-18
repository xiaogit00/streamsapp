const SEPARATOR = '//**//'
const CACHE_INTERVAL = 1440 * 60 * 1000 //60000 = 1min

function setupCache() {
    localStorage.clear()
}

function store(key, value) {
    var finalValue = '' + value + SEPARATOR + Date.now().toString()
    localStorage.setItem(key, finalValue)
}

function isValid(key) {
    console.log('cache.isValid is entered')
    var value = localStorage.getItem(key)
    if (value === null) {
        return {
            isValid: false,
        }
    }
    var values = value.split(SEPARATOR)
    var timestamp = Number(values[1])
    if (Number.isNaN(timestamp)) {
        return {
            isValid: false,
        }
    }
    var date = new Date(timestamp)
    if (date.toString() === 'Invalid Date') {
        return {
            isValid: false,
        }
    }
    if ((Date.now() - date.getTime()) < CACHE_INTERVAL) {
        return {
            isValid: true,
            value: values[0],
        }
    }
    localStorage.removeItem(key)
    return {
        isValid: false,
    }
}

export const cache = {
    store, isValid,
}
