//PseudoCode
//Action Creators

const initialState = {
    streamModalOpen: false,
    tradeModalOpen: false,
    orderModalOpen: false
}

const modalReducer = (state = initialState, action) => {
    switch(action.type) {
    case 'TOGGLE_STREAM': {
        const newState = {
            ...state,
            streamModalOpen: !state.streamModalOpen
        }
        return newState
    }
    case 'TOGGLE_ORDER': {
        const newState = {
            ...state,
            orderModalOpen: !state.orderModalOpen
        }
        return newState
    }
    case 'TOGGLE_TRADE': {
        const newState = {
            ...state,
            tradeModalOpen: !state.tradeModalOpen
        }
        return newState
    }
    default:
        return state
    }
}

export default modalReducer
