import React, { useState, useEffect } from 'react'
import '../App.css'
import TableRowItems from './tableRowItems'
import { nominal_value } from './utils'
import streamData from './calcs/tablerow/streamData'
import swapsData from './calcs/tablerow/swapsData'
import returnsData from './calcs/tablerow/returnsData'
// import unrealizedReturnsSwaps from './calcs/tablerow/unrealizedReturnsSwaps'
const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' })
var globalNominalDenom = require('../config.json').globalNominalDenom;

//rowData.latestDate()
//rowData.avgPurchasePrice
//

const TableRow = ({individualStream, trades}) => {


  // const [currentPrice, setCurrentPrice] = useState("")
  // const [currentValue, setCurrentValue] = useState("")
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
  const currentPrice = 64217
  const currentValue = 3861
  //**********************************************
  //*             Swaps Data
  //**********************************************
// Here, I created swapsData, which is an array of swapObjects. Each swapObject represents
// an aggregation of swap trades within the class.
// Each swap object in array contains the following fields:
//  -asset, tradeIDs, swapTrades, totalAmtSwapped, totalAmtSwappedBase, avgPurchasePriceInBaseAsset
  const swaps = swapsData(individualStream, trades)





  //**********************************************
  //*             Returns Data
  //**********************************************
  const returns = returnsData(stream, trades, swaps, currentPrice, currentValue)
  // let returnsData = {
  //   //**********************************************
  //   //*             Closed Trade Returns Data
  //   //**********************************************
  //   realizedReturnsPercentage: ((stream.avgClosePrice() / stream.avgPurchasePrice()) - 1)*100,
  //   weightClosed: stream.totalAmtSold() / stream.totalAmtPurchased(),
  //   closedTradeReturnsAbsolute: function () {
  //     return this.realizedReturnsPercentage * this.weightClosed
  //   },
  //   //**********************************************
  //   //*             Open Swaps Returns
  //   //**********************************************
  //   openSwapReturns: individualStream.swaps.map(swap => {
  //     //This will create as many swap returns objects as there are number of swaps in the Stream
  //     // Each object will contain unrealizedReturnsSwapsPercentage, weightSwaps, swapsTradeReturnsAbsolute
  //     // I will need to create a swap object
  //     swap.unrealizedReturnsSwapsPercentage = (swapsCurrentPrices[swap.asset]/swap.avgPurchasePriceInBaseAsset - 1)*100
  //     swap.weightSwaps = swap.totalAmtSwappedBase / stream.totalAmtPurchased()
  //     swap.swapsTradeReturnsAbsolute = swap.unrealizedReturnsSwapsPercentage * swap.weightSwaps
  //     return swap
  //   }),
  //   // unrealizedReturnsSwapsPercentage: (swapsCurrentPrices["ZIL"]/swapsData[0].avgPurchasePriceInBaseAsset - 1)*100,
  //   // weightSwaps: swapsData[0].totalAmtSwappedBase / stream.totalAmtPurchased(),
  //   // swapsTradeReturnsAbsolute: function() {
  //   //   return this.unrealizedReturnsSwapsPercentage * this.weightSwaps
  //   // },
  //   //This loops through all swaps and sums their weight together
  //   weightSwaps: function() {
  //     return this.openSwapReturns.reduce((a,swap) => a + swap.weightSwaps, 0)
  //   },
  //   swapTradeReturnsAbsoluteArray: function() {
  //     return this.openSwapReturns.map(swap=> swap.swapsTradeReturnsAbsolute)
  //   },
  //   swaptradeReturnsAbsolute: function () {
  //     return this.openSwapReturns.map(swap=> swap.swapsTradeReturnsAbsolute).reduce((a,num) => a+num, 0)
  //   },
  //   //**********************************************
  //   //*             Closed Swaps Returns
  //   //**********************************************
  //   closedSwapReturns: individualStream.swaps.map(swap => {
  //     //This will create as many swap returns objects as there are number of swaps in the Stream
  //     // Each object will contain unrealizedReturnsSwapsPercentage, weightSwaps, swapsTradeReturnsAbsolute
  //     // I will need to create a swap object
  //     swap.realizedReturnsSwapsPercentage = (swapsCurrentPrices[swap.asset]/swap.avgPurchasePriceInBaseAsset - 1)*100
  //     swap.weightSwaps = swap.totalAmtSwappedBase / stream.totalAmtPurchased()
  //     swap.swapsTradeReturnsAbsolute = swap.unrealizedReturnsSwapsPercentage * swap.weightSwaps
  //     return swap
  //   }),
  //   // unrealizedReturnsSwapsPercentage: (swapsCurrentPrices["ZIL"]/swapsData[0].avgPurchasePriceInBaseAsset - 1)*100,
  //   // weightSwaps: swapsData[0].totalAmtSwappedBase / stream.totalAmtPurchased(),
  //   // swapsTradeReturnsAbsolute: function() {
  //   //   return this.unrealizedReturnsSwapsPercentage * this.weightSwaps
  //   // },
  //   //This loops through all swaps and sums their weight together
  //   weightSwaps: function() {
  //     return this.openSwapReturns.reduce((a,swap) => a + swap.weightSwaps, 0)
  //   },
  //   swapTradeReturnsAbsoluteArray: function() {
  //     return this.openSwapReturns.map(swap=> swap.swapsTradeReturnsAbsolute)
  //   },
  //   swaptradeReturnsAbsolute: function () {
  //     return this.openSwapReturns.map(swap=> swap.swapsTradeReturnsAbsolute).reduce((a,num) => a+num, 0)
  //   },
  //   //**********************************************
  //   //*            Open returns
  //   //**********************************************
  //   unrealizedReturnsPercentage: ((currentPrice / stream.avgPurchasePrice()) - 1)*100,
  //   weightOpen: function() {
  //     return (1 - this.weightClosed - this.weightSwaps())
  //   },
  //   openTradeReturnsAbsolute: function() {
  //     return this.unrealizedReturnsPercentage * this.weightOpen()
  //   },
  //   streamReturns: function() {
  //     return this.closedTradeReturnsAbsolute() + this.openTradeReturnsAbsolute() + this.swaptradeReturnsAbsolute()
  //   }
  //
  // }
  //
  //
  //
  //
  //
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
      currentValue: Math.round(currentValue*100)/100,
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
      </div>

      </>
    )

}

export default TableRow
