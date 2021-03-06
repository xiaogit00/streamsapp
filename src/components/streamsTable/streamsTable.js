import React, { useEffect } from 'react'
import { initializeStreams } from 'reducers/streamReducer'
import { initializeTrades } from 'reducers/tradeReducer'
import { useSelector, useDispatch } from 'react-redux'
import 'App.css'
import TableHead from 'components/streamsTable/tableHead'
import TableRow from 'components/streamsTable/tableRow'
import EditStreamModal from 'components/streamBar/editStreamModal'


const StreamsTable = () => {
    console.log('StreamsTable is entered')
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
        console.log('STREAMS:', streams)
        return (
            <div className="streams-table-container">
                <TableHead globalDenom={globalDenom}/>
                {streams.map((stream, i) => {
                    return <TableRow key={stream.id} individualStream={stream} trades={trades} globalDenom={globalDenom} num={i+1}/>
                })}
                <EditStreamModal/>

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
