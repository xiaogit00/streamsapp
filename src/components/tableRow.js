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
  console.log(weights)
  const dateString = stream.latestDate().getDate()
                    + ' '
                    + stream.latestDate().toLocaleString('default', { month:'short'})
                    + ' '
                    + stream.latestDate().getFullYear().toString().substr(-2)

  // //**********************************************
  // //*             Supplying data into Row
  // //**********************************************
    var rowData = {
      date: stream.latestDate(),
      id: individualStream.id,
      asset: individualStream.asset,
      avgPurchasePrice: Math.round(stream.avgPurchasePrice()*100)/100,
      currentPrice: Math.round(currentPrice*100)/100,
      purchaseValue: Math.round(stream.totalSpentOpenNominal()*100)/100,
      currentValue: Math.round(stream.totalAmtPurchased()*currentPrice*100)/100,
      returns: Math.round(returns*100)/100
    }

  const Date = styled.div`
  width: 10%;
  /* border-right: 1px dotted grey; */
  margin-bottom: 3px;
  margin-top: 7px;
  padding: 2px;
  font-size: .8em;
  `
  const StreamBar = styled.div`
  width: 90%;
  border: 2px solid grey;
  border-radius: 18px;
  display: flex;
  font-size: 70%;
  /* padding: 2px; */
  /* align-items: center; */
  margin-bottom: 3px;
  margin-top: 7px;
  align-content: flex-start;
  justify-content: space-around;
  min-height: 42px;
  max-heigth: 50px;
  `

  const columnStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const StreamNumber = styled.div`

  width: 17%;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  background-color: #EDEDF7;
  font-size: 1.2em;

  `
  const Asset = styled.div`
  width: 11%;
  text-align: center;
  font-size: 1.2em;
  `
  const AvgPurchasePrice = styled.div`
  width: 15%;
  text-align: center;
  font-size: 1.3em;
  `
  const CurPrice = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  `
  const PurchaseValue = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  `
  const CurrentValue = styled.div`
  font-size: 1.2em;
  width: 15%;
  text-align: center;
  `
  const Returns = styled.div`
  font-size: 1.3em;
  width: 12%;
  text-align: center;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
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
          <Asset style={columnStyle}>$23123</Asset>
          <AvgPurchasePrice style={columnStyle}>$23123</AvgPurchasePrice>
          <CurPrice style={columnStyle}>$23123</CurPrice>
          <PurchaseValue style={columnStyle}>$23123</PurchaseValue>
          <CurrentValue style={columnStyle}>$23123</CurrentValue>
          <Returns style={columnStyle}>4%</Returns>
        </StreamBar>

      </div>


      </>
    )

}

export default TableRow

// COMMENTED OUT JSX

// <TableRowItems rowData={rowData}/>
// <TableRowProgressBarV2 weights={weights}/>
