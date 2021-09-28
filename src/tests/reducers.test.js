//**********************************************************
//*                     Test Requirements
//**********************************************************
//Test that store creation is successful, and that state is initialized with the right data


//**********************************************************
//*                     Higher level Implementation
//**********************************************************
import store from '../utils/store'
import initializeStreams from '../reducers/streamReducer'
import initializeTrades from '../reducers/tradeReducer'
import { useDispatch } from 'react-redux'
// import store
// useEffect and dispatch
// getState()
test('Store creation is successful; States are also initialized', () => {
    const dispatch = useDispatch()

    dispatch(initializeStreams())

    dispatch(initializeTrades())

    console.log(store.getState())
})
