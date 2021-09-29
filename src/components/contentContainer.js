import React from 'react'
import 'App.css'
import StreamsTable from 'components/streamsTable/streamsTable'
import BasicSpeedDial from 'components/floatingActionButtonAdd/speedDail'





const ContentContainer = () => {

    return (
        <div className="content-container-flex">
            <StreamsTable />
            <BasicSpeedDial />

        </div>
    )
}

export default ContentContainer
