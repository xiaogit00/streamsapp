// What do I need to import?
import { useSelector, useDispatch } from 'react-redux'
import { updateTrade } from 'reducers/tradeReducer'

//The main line is this:



// Where updateTrade() is an action creator that takes tradeId, as well as an object that
// is to be updated.

// WHAT I NEED TO IMPORT:
// useDispatch
// updateTrade --> this is an action creator

test('put request to trade is successful', () => {
    const tradeId = '61ca961916151388d074bbb0'//What is the tradeId?
    const tradeObject = {
        
    }
    const dispatch = useDispatch()
    dispatch(updateTrade(tradeId, {...tradeObject, assigned:false}))
})
