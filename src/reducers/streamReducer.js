import streamService from '../services/streams'

export const initializeStreams = () => {
    return async dispatch => {
        const streams = await streamService.getAll()
        dispatch({
            type: 'INIT_STREAMS',
            data: streams
        })
    }
}



const streamReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_STREAMS': {
        return action.data
    }

    // case 'NEW_STREAM': {
    //     const newStreams = state.concat(action.data)
    //     return newStreams
    // }
    //
    // case 'UPDATE_STREAM': {
    //
    // }
    //
    // case 'UPDATE_TRADE_IN_STREAM': {
    //
    // }
    //
    // case 'DELETE_STREAM': {
    //
    // }
    default:
        return state
    }
}

export default streamReducer
