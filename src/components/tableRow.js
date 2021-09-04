import React, { useState, useEffect } from 'react'
import '../App.css'
import TableRowItems from './tableRowItems'
import TableRowProgressBar from './tableRowProgressBar'
import { nominal_value } from './utils'
import streamData from './calcs/tablerow/streamData'
import swapsData from './calcs/tablerow/swapsData'
import returnsDataWithSwap from './calcs/tablerow/returnsDataWithSwap'
import returnsData from './calcs/tablerow/returnsData'
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

  if (individualStream.swaps) {
    swaps = swapsData(individualStream, trades)
    //**********************************************
    //*             Returns Data
    //**********************************************
    returns = returnsDataWithSwap(stream, trades, swaps, currentPrice, currentValue)
  } else {
    returns = returnsData(stream, trades, currentPrice)
  }





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

  //**********************************************
//*             Rendering
//**********************************************
    // console.log("value of rowData within tableRow: ", rowData)
    return (
      <>
      <div className="table-row-flex-container">
        <TableRowItems rowData={rowData}/>
        <TableRowProgressBar />
      </div>


      </>
    )

}

export default TableRow
