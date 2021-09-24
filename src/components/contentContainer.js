import React from 'react'
import '../App.css'
import StreamsTable from './streamsTable'




const ContentContainer = ({globalDenom, trades, streams}) => {

  return (
    <div className="content-container-flex">
    // {console.log("this is globalDenom within the render in ContentCOntainer: ", globalDenom)}
      <StreamsTable globalDenom={globalDenom} trades={trades} streams={streams}/>

    </div>
  )
}

export default ContentContainer
