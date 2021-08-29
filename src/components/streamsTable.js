import React, { useState, useEffect } from 'react'
import '../App.css'
import TableHead from './tableHead'
import TableRow from './tableRow'
import axios from 'axios'


const StreamsTable = () => {
  const [trades, setTrades] = useState([])
  const [streams, setStreams] = useState([])

  useEffect(() => {
    console.log("Successfully finished first render of App and entered effectHook again.")
    axios
      .get('http://localhost:3001/api/trades')
      .then(response => {

        setTrades(response.data)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/streams')
      .then(response => {

        setStreams(response.data)
      })
  }, [])
  // console.log("value of streams in Streamstable", streams)
  // console.log("length of Streams array", streams.length)
  if (streams.length > 0) {
    return (
      <div className="streams-table-container">
        <TableHead/>
        <TableRow individualStream={streams[0]} trades={trades}/>

      </div>
    )
  } else {
    return (
      <div className="streams-table-container">
        <TableHead/>

      </div>
    )
  }

}

export default StreamsTable
