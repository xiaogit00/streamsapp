import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//IMPORT REDUCERSHERE
import streamReducer from '../reducers/streamReducer'
import tradeReducer from '../reducers/tradeReducer'
import globalDenomReducer from '../reducers/globalDenomReducer'
import modalReducer from '../reducers/modalReducer'

const reducer = combineReducers({
    streams: streamReducer,
    trades: tradeReducer,
    globalDenom: globalDenomReducer,
    modals: modalReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store
