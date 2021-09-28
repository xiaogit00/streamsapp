import tradeService from '../services/trades'

export const initializeTrades = async () => {
    return async dispatch => {
        const trades = await tradeService.getAll()
        dispatch({
            type: 'INIT_TRADES',
            data: trades
        })
    }
}



const tradeReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_TRADES': {
            return action.data
        }

        // case 'NEW_TRADES': {
        // }
        //
        // case 'UPDATE_TRADE': {
        //
        // }
        //
        // case 'DELETE_TRADE': {
        //
        // }
    default:
        return state
    }
}

export default tradeReducer
