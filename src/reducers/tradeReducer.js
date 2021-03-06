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

export const updateTrade = (id, trade) => {
    console.log(`id: ${id}`)
    console.log('trade Object: ', trade)
    //Okay there is a problem here. the trade object is an object with two properties: 0, and assigned.
    //It should be just an object, with assigned as property. This means that when
    //it is passed to updateTrade, it is already in the wrong format. 
    return async dispatch => {
        const response = await tradeService.updateTrade(id, trade)
        dispatch({
            type:'UPDATE_TRADE',
            data: {
                id,
                trade
            }
        })

    }
}

export const toggleTradeAssignment = (id) => {
    return async dispatch => {
        const response = await tradeService.toggleTradeAssignment(id)
        dispatch({
            type:'TOGGLE_TRADE_IN_STREAM_ASSIGNMENT',
            data: {
                id
            }
        })

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
    case 'UPDATE_TRADE': {
        const id = action.data.id
        const newTrade = action.data.trade
        console.log('newTrade',newTrade)
        return state.map(trade => trade.id !== id ? trade : newTrade)
    }
    case 'TOGGLE_TRADE_IN_STREAM_ASSIGNMENT': {
        const id = action.data.id
        const tradeObject = state.filter(trade => trade.id === id)
        const newTradeOject = {
            ...tradeObject,
            assigned: false
        }
        return state.map(trade => trade.id !== id ? trade : newTrade)

    }
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
