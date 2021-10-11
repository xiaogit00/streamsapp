import React from 'react'
import 'App.css'
import StreamsTable from 'components/streamsTable/streamsTable'
import BasicSpeedDial from 'components/floatingActionButtonAdd/speedDail'
import TradesTable from 'components/tradesTable/tradesTable'





const ContentContainer = ({ type }) => {
    if (type === 'streams') {
        return (
            <div className="content-container-flex">
                <StreamsTable />
                <BasicSpeedDial />

            </div>
        )
    } else if (type === 'trades') {
        return (
            <div className="content-container-flex">
                <TradesTable />

            </div>
        )
    }

}

export default ContentContainer
