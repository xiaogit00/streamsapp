

const globalDenomReducer = (state = 'SGD', action) => {
    switch(action.type) {
    case 'CHANGE_TO_USD': {
        return 'USD'
    }
    default:
        return state
    }
}

export default globalDenomReducer
