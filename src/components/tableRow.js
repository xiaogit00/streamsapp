import React, { useState, useEffect } from 'react'
import '../App.css'
import TableRowItems from './tableRowItems'
import TableRowProgressBarV2 from './tableRowProgressBarV2'
import { nominal_value } from './utils'
import streamData from './calcs/tablerow/streamData'
import swapsData from './calcs/tablerow/swapsData'
import returnsDataWithSwap from './calcs/tablerow/returnsDataWithSwap'
import returnsData from './calcs/tablerow/returnsData'
import styled from 'styled-components';
// import unrealizedReturnsSwaps from './calcs/tablerow/unrealizedReturnsSwaps'
const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' })
var globalNominalDenom = require('../config.json').globalNominalDenom;

//rowData.latestDate()
//rowData.avgPurchasePrice
//

const TableRow = ({individualStream, trades}) => {


  const [swapsCurrentPrices, setSwapsCurrentPrices] = useState([])


  //**********************************************
  //*             Data Prep - trades, date, total open/closed amts, avg price
  //**********************************************
  // Returns a stream object with following fields:
  // tradesInStream,filteredTrades,baseAsset,openTrades(),closedTrades(),latestDate(),totalSpentOpenNominal(),totalCashedOutNominal(),totalAmtPurchased(),totalAmtSold(),avgPurchasePrice(),avgClosePrice()
  const stream = streamData(individualStream, trades)

  //**********************************************
  //*             Generate current price
  //**********************************************
//
  // useEffect(() => {
  //   alpha.forex.rate(individualStream.asset, globalNominalDenom).then(res => {
  //     setCurrentPrice(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
  //     setCurrentValue(strea.totalAmtPurchased()*res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
  //   })
    //Getting prices of swap assets
    //accessible via: swapsCurrentPrices.ZIL
    // individualStream.swaps.map(swap => {
    //   alpha.forex.rate(swap.asset, strea.baseAsset).then(data => {
    //     setSwapsCurrentPrices(swapsCurrentPrices => [...swapsCurrentPrices, {[swap.asset]:data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}])
    //   })
    // })
    // }, [])
    // EXAMPLE FORMAT OF SWAP ASSET PRICES:
//     [
//   {
//     "ETH": "0.07434600"
//   },
//   {
//     "ZIL": "0.00000233"
//   }
// ]


//


  //STATIC VALUES TO USE FOR TESTING - COMMENT OFF WHEN TURNING ON API

  swapsCurrentPrices["ZIL"] = 0.00000232
  swapsCurrentPrices["ETH"] = 0.07416300
  let currentPrice = 0
  let currentValue = 0

  if (individualStream.asset === "BTC") {
    currentPrice = 64217
    currentValue = 3861
  } else if (individualStream.asset === "ETH") {
    // console.log(individualStream.asset)
    currentPrice = 5067
  } else if (individualStream.asset === "Alibaba") {
    // console.log(individualStream.asset)
    currentPrice = 28.86
  } else if (individualStream.asset === "Xiaomi") {
    // console.log(individualStream.asset)
    currentPrice = 4.37
  } else if (individualStream.asset === "JD.com") {

    currentPrice = 53.74
  } else if (individualStream.asset === "HST") {
    // console.log(individualStream.asset)
    currentPrice = 1.132
  } else if (individualStream.asset === "Tencent") {
    // console.log(individualStream.asset)
    currentPrice = 84.32
    console.log(individualStream.asset)
    console.log(stream.totalSpentOpenNominal())
  }

  // console.log(stream.avgPurchasePrice())

  //**********************************************
  //*             Swaps Data (IF THERE ARE SWAPS)
  //**********************************************
// Here, I created swapsData, which is an array of swapObjects. Each swapObject represents
// an aggregation of swap trades within the class.
// Each swap object in array contains the following fields:
//  -asset, tradeIDs, swapTrades, totalAmtSwapped, totalAmtSwappedBase, avgPurchasePriceInBaseAsset
  let swaps = []
  let returns = 0
  let weights = {}

  if (individualStream.swaps) {
    swaps = swapsData(individualStream, trades)
    // console.log(swaps[0].weightOpen)
    weights.swapOpen = swaps[0].weightOpen*100
    weights.swapClosed = swaps[0].weightClosed*100
    weights.closed = (stream.totalAmtSold() / stream.totalAmtPurchased())*100

    weights.open = (100 - weights.closed - (weights.swapOpen + weights.swapClosed))

    // console.log(swaps)
    //**********************************************
    //*             Returns Data
    //**********************************************
    returns = returnsDataWithSwap(stream, trades, swaps, currentPrice, currentValue)
  } else {
    returns = returnsData(stream, trades, currentPrice)
    weights.closed = (stream.totalAmtSold() / stream.totalAmtPurchased())*100
    weights.open = (100 - weights.closed)
  }

  // let round = (weightObj) => {
  //   const roundedWeights = weightObj.map(weight => Math.round(weight*100)/100)
  //   return roundedWeights
  // }
  //
  // let weight = round(weights)
  Object.keys(weights).map((key, index) => weights[key] = Math.round(weights[key]*100)/100)

  const dateString = stream.latestDate().getDate()
                    + ' '
                    + stream.latestDate().toLocaleString('default', { month:'short'})
                    + ' '
                    + stream.latestDate().getFullYear().toString().substr(-2)

  // //**********************************************
  // //*             Supplying data into Row
  // //**********************************************

  const columnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const StreamBar = styled.div`
    width: 90%;
    outline: 2px solid grey;
    /* outline: 12px solid red; */
    border-radius: 10px;
    display: flex;
    font-size: 70%;
    /* padding: 2px; */
    /* align-items: center; */
    margin-bottom: 3px;
    margin-top: 7px;
    margin-right: 10px;
    align-content: flex-start;
    justify-content: space-around;
    min-height: 42px;
    max-heigth: 50px;
  `

  const Date = styled.div`
    width: 10%;
    /* border-right: 1px dotted grey; */
    margin-bottom: 3px;
    margin-top: 7px;
    padding: 2px;
    font-size: 0.9em;
    color: #929292;
    font-family: Calibri, sans-serif;
    font-weight: bold;
  `

  const StreamNumber = styled.div`
    width: 17%;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #EDEDF7;
    font-size: 1.2em;
    font-weight: bold;
    color: #285054;
    font-family: Calibri, sans-serif;
    z-index: 3;
  `
  const Asset = styled.div`
    width: 11%;
    text-align: center;
    font-size: 1.2em;
    font-family: "American Typewriter", serif;
    border-right: 0.6px dotted grey;
  `
  const AvgPurchasePrice = styled.div`
    width: 15%;
    text-align: center;
    font-size: 1.3em;
    border-right: 0.6px dotted grey;
  `
  const CurPrice = styled.div`
    font-size: 1.2em;
    width: 15%;
    text-align: center;
    border-right: 0.6px dotted grey;
  `
  const PurchaseValue = styled.div`
    font-size: 1.2em;
    width: 15%;
    text-align: center;
    border-right: 0.6px dotted grey;
  `
  const CurrentValue = styled.div`
    font-size: 1.2em;
    width: 15%;
    text-align: center;
    border-right: 0.6px dotted grey;
  `
  const Returns = styled.div`
    font-size: 1.3em;
    width: 12%;
    text-align: center;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  `
  const ProgressBar = styled.div`
  /* border: 1px solid green; */
  position: absolute;
  width: 74.7%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  min-height: 42px;
  max-height: 50px;
  right: 0;
  margin-bottom: 3px;
  margin-right: 10px;
  /* margin-top: 7px; */
  z-index: 2;
  display: flex;
  `

  let barIsLast = {}

  if (weights.swapClosed > 1) {
    barIsLast.swapClosed = true
  } else {
    if (weights.swapOpen > 1) {
      barIsLast.swapOpen = true
    } else {
        if (weights.closed > 1) {
          barIsLast.closed = true
        } else {
          barIsLast.open = true
        }
    }
  }

  const WeightOpen = styled.div`
    background-color: #3E8CAA;
    width: ${weights.open}%;
    border-top-right-radius: ${props => props.isLast ? "10px" : "0px" };
    border-bottom-right-radius: ${props => props.isLast ? "10px" : "0px" };
    opacity: 15%;
    z-index: 2;
    :hover {
      background-color: #EDFBF5;
      cursor: pointer;
      opacity: 100%;
      z-index: 3;
    }
  `

  const WeightClosed = styled.div`
    background-color: #7C7D7D;
    width: ${weights.closed}%;
    border-top-right-radius: ${props => props.isLast ? "10px" : "0px" };
    border-bottom-right-radius: ${props => props.isLast ? "10px" : "0px" };
    opacity: 15%;
    z-index: 2;
    :hover {
      background-color: grey;
      cursor: pointer;
      opacity: 100%;
      z-index: 3;
    }
  `
  const WeightSwapOpen = styled.div`
    background-color: #CA8534;
    width: ${weights.swapOpen}%;
    border-top-right-radius: ${props => props.isLast ? "10px" : "0px" };
    border-bottom-right-radius: ${props => props.isLast ? "10px" : "0px" };
    opacity: 15%;
    z-index: 2;
    :hover {
      background-color: maroon;
      cursor: pointer;
      opacity: 100%;
      z-index: 3;
    }
  `

  const WeightSwapClosed = styled.div`
    background-color: #7C7D7D;
    width: ${weights.swapClosed}%;
    border-top-right-radius: ${props => props.isLast ? "10px" : "0px" };
    border-bottom-right-radius: ${props => props.isLast ? "10px" : "0px" };
    opacity: 15%;
    z-index: 2;
    :hover {
      background-color: grey;
      cursor: pointer;
      opacity: 100%;
      z-index: 3;
    }
  `
  //**********************************************
//*             Rendering
//**********************************************
    // console.log("value of rowData within tableRow: ", rowData)
    return (
      <>
      <div className="table-row-flex-container">
        <Date style={columnStyle}>
          {dateString}
        </Date>
        <StreamBar>
          <StreamNumber style={columnStyle}>Stream #{individualStream.id} </StreamNumber>
          <Asset style={columnStyle}>{individualStream.asset}</Asset>
          <AvgPurchasePrice style={columnStyle}>{Math.round(stream.avgPurchasePrice()*100)/100}</AvgPurchasePrice>
          <CurPrice style={columnStyle}>{Math.round(currentPrice*100)/100}</CurPrice>
          <PurchaseValue style={columnStyle}>{Math.round(stream.totalSpentOpenNominal()*100)/100}</PurchaseValue>
          <CurrentValue style={columnStyle}>{Math.round(stream.totalAmtPurchased()*currentPrice*100)/100}</CurrentValue>
          <Returns style={columnStyle}>{Math.round(returns*100)/100}</Returns>
          <ProgressBar>
            <WeightOpen isLast={barIsLast.open}></WeightOpen>
            <WeightClosed isLast={barIsLast.closed}></WeightClosed>
            <WeightSwapOpen isLast={barIsLast.swapOpen}></WeightSwapOpen>
            <WeightSwapClosed isLast={barIsLast.swapClosed}></WeightSwapClosed>
          </ProgressBar>
        </StreamBar>


      </div>


      </>
    )

}

export default TableRow

// COMMENTED OUT JSX

// <TableRowItems rowData={rowData}/>
// <TableRowProgressBarV2 weights={weights}/>
