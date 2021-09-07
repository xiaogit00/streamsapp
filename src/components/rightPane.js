import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import HeaderBlock from './headerBlock'
import ContentContainer from './contentContainer.js'
var globalNominalDenom = require('../config.json').globalNominalDenom;

const RightPane = () => {
  const [globalDenom, setGlobalDenom] = useState(globalNominalDenom)
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
        // console.log("streams",response.data)
      })
  }, [])

  const handleDenomChange = (newValue) => {
    setGlobalDenom(newValue)
    console.log("GLOBAL DENOM IS SET TO: ",newValue)
  }

  return(

        <div className='right-pane-inner'>
          <HeaderBlock globalDenom={globalDenom} onChange={handleDenomChange}/>
          {console.log("this is globalDenom within the render: ", globalDenom)}
          <ContentContainer globalDenom={globalDenom} trades={trades} streams={streams}/>

        </div>
  )
}

export default RightPane
