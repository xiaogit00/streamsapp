import streamService from '../services/streams'

export const initializeStreams = () => {
    return async dispatch => {
        try {
            const streams = await streamService.getAll()
            dispatch({
                type: 'INIT_STREAMS',
                data: streams
            })
        } catch(err) {
            console.log('an error has occurred within streamReducer:',err)
        }

    }
}

export const newStream = content => {
    return async dispatch => {
        const newStream = await streamService.createNew(content) //sends the data to Database. content is object.
        dispatch({
            type: 'NEW_STREAM',
            data: newStream
        })
    }
}

export const deleteStream = id => {
    return async dispatch => {
        //the idea is that you make a delete request, and then
        // dispatch new state of streams
        const responseStatus = await streamService.deleteStream(id)
        if (responseStatus === 204) {
            dispatch({
                type:'DELETE_STREAM',
                data: id
            })
        }

    }
}

export const updateStream = (id, stream) => {
    return async dispatch => {
        const newStream = await streamService.updateStream(id, stream)
        if (newStream === 204) {
            dispatch({
                type: 'UPDATE_STREAM',
                data: {
                    id,
                    stream
                }
            })
        }

    }
}



const streamReducer = (state = [], action) => {
    switch(action.type) {
    case 'INIT_STREAMS': {
        return action.data
    }

    case 'NEW_STREAM': {
        const newStreams = state.concat(action.data)
        return newStreams
    }
    //
    case 'UPDATE_STREAM': {
        const id = action.data.id
        const newStream = action.data.stream
        return state.map(stream => stream.id !== id ? stream : newStream)
    }
    //
    // case 'UPDATE_TRADE_IN_STREAM': {
    //
    // }
    //
    case 'DELETE_STREAM': {
        const id = action.data
        const newStreams = state.filter(stream => stream.id !== id)
        return newStreams
    }
    default:
        return state
    }
}

export default streamReducer
