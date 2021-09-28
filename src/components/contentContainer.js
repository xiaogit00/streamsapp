import React from 'react'
import 'App.css'
import StreamsTable from 'components/streamsTable/streamsTable'
import BasicSpeedDial from 'components/floatingActionButtonAdd/speedDail'
import ModalUnstyledDemo from 'components/floatingActionButtonAdd/addStreamModal'




const ContentContainer = () => {

    return (
        <div className="content-container-flex">
            <StreamsTable />
            <BasicSpeedDial />
            <ModalUnstyledDemo />
        </div>
    )
}

export default ContentContainer
