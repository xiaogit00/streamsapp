import React, { useState, useEffect } from 'react'
import '../App.css'
import TableHead from './tableHead'
import TableRow from './tableRow'



const StreamsTable = ({ globalDenom, trades, streams }) => {

  


  // console.log("value of streams in Streamstable", streams)
  // console.log("length of Streams array", streams.length)
  if (streams.length > 0) {
    return (
      <div className="streams-table-container">
        <TableHead globalDenom={globalDenom}/>
        <TableRow individualStream={streams[0]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[1]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[2]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[3]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[4]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[5]} trades={trades} globalDenom={globalDenom}/>
        <TableRow individualStream={streams[6]} trades={trades} globalDenom={globalDenom}/>

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
