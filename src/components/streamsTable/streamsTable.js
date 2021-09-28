import React, { useEffect } from 'react'
import { initializeStreams } from 'reducers/streamReducer'
import { initializeTrades } from 'reducers/tradeReducer'
import { useSelector, useDispatch } from 'react-redux'
import 'App.css'
import TableHead from 'components/streamsTable/tableHead'
import TableRow from 'components/streamsTable/tableRow'



const StreamsTable = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeStreams())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeTrades())
    }, [dispatch])

    const streams = useSelector(state => state.streams)

    const trades = useSelector(state => state.trades)

    const globalDenom = useSelector(state => state.globalDenom)

    if (streams.length > 0) {
        return (
            <div className="streams-table-container">
                <TableHead globalDenom={globalDenom}/>
                <TableRow individualStream={streams[0]} trades={trades} globalDenom={globalDenom} num={1}/>
                <TableRow individualStream={streams[1]} trades={trades} globalDenom={globalDenom} num={2}/>
                <TableRow individualStream={streams[2]} trades={trades} globalDenom={globalDenom} num={3}/>
                <TableRow individualStream={streams[3]} trades={trades} globalDenom={globalDenom} num={4}/>
                <TableRow individualStream={streams[4]} trades={trades} globalDenom={globalDenom} num={5}/>
                <TableRow individualStream={streams[5]} trades={trades} globalDenom={globalDenom} num={6}/>
                <TableRow individualStream={streams[6]} trades={trades} globalDenom={globalDenom} num={7}/>

            </div>
        )
    } else {
        return (
            <div className="streams-table-container">
                <TableHead globalDenom={globalDenom}/>

            </div>
        )
    }

}

export default StreamsTable
