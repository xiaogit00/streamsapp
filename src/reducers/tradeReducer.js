import tradeService from '../services/trades'

export const initializeTrades = () => {
    return async dispatch => {
        const trades = await tradeService.getAll()
        dispatch({
            type: 'INIT_TRADES',
            data: trades
        })
    }
}

export const newTrade = content => {
    return async dispatch => {
        const newTrade = await tradeService.createNew(content) //sends the data to Database. content is object.
        dispatch({
            type: 'NEW_TRADE',
            data: newTrade
        })
    }
}

export const deleteTrade = id => {
    return async dispatch => {
        //the idea is that you make a delete request, and then
        // dispatch new state of streams
        const responseStatus = await tradeService.deleteTrade(id)
        if (responseStatus === 204) {
            dispatch({
                type:'DELETE_TRADE',
                data: id
            })
        }

    }
}



const tradeReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_TRADES': {
        return action.data
    }

    case 'NEW_TRADE': {
        const newTrades = state.concat(action.data)
        return newTrades
    }
    //
    // case 'UPDATE_TRADE': {
    //
    // }
    //
    case 'DELETE_TRADE': {
        const id = action.data
        const newTrades = state.filter(trade => trade.id !== id)
        return newTrades
    }
    default:
        return state
    }
}

export default tradeReducer
