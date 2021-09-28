
export const changeDenom = (currency) => {
    return {
        type: 'CHANGE_DENOM',
        currency
    }
}

const globalDenomReducer = (state = 'SGD', action) => {
    switch(action.type) {
    case 'CHANGE_DENOM': {
        const newDenom = action.currency
        return newDenom
    }
    default:
        return state
    }
}

export default globalDenomReducer
