import React, { useState, useEffect } from 'react'
import '../App.css'
import TableRowItems from './tableRowItems'
import { nominal_value } from './utils'
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
  let streamData = {
    tradesInStream: individualStream.trades,
    filteredTrades: function() {
      return trades.filter(trade => this.tradesInStream.includes(trade.id))
    },
    baseAsset: individualStream.asset,
    openTrades: function() {
      return this.filteredTrades().filter(trade => trade.position === "open")
    },
    closedTrades: function() {
      return this.filteredTrades().filter(trade => trade.position === "closed")
    },
    latestDate: function() {
      return new Date(Math.max(...this.openTrades().map(trade => new Date(trade.date))))
    },
    totalSpentOpenNominal: function () {
      const nominalValueTradesOpen = this.openTrades().map(trade => nominal_value(trade.value, trade.value_denom, globalNominalDenom))
      const totalSpentOpenNominal = nominalValueTradesOpen.reduce((a, nominalValue) => a + nominalValue,0)
      return totalSpentOpenNominal
    },
    totalCashedOutNominal: function () {
      const nominalValueTradesClosed = this.closedTrades().map(trade => nominal_value(trade.value, trade.value_denom, globalNominalDenom))
      const totalCashedOutNominal = nominalValueTradesClosed.reduce((a, nominalValue) => a + nominalValue,0)
      return totalCashedOutNominal
    },
    totalAmtPurchased: function() {
      return this.openTrades().reduce((a, trade) => a + trade.amt,0)
    },
    totalAmtSold: function () {
      return this.closedTrades().reduce((a, trade) => a + trade.amt,0)
    },
    avgPurchasePrice: function() {
      const avgPurchasePrice = this.totalSpentOpenNominal() / this.totalAmtPurchased()
      return avgPurchasePrice
    },
    avgClosePrice: function() {
      return this.totalCashedOutNominal() / this.totalAmtSold()
    }
  }
  //**********************************************
  //*             Generate current price
  //**********************************************
//
  // useEffect(() => {
  //   alpha.forex.rate(individualStream.asset, globalNominalDenom).then(res => {
  //     setCurrentPrice(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
  //     setCurrentValue(streamData.totalAmtPurchased()*res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
  //   })
    //Getting prices of swap assets
    //accessible via: swapsCurrentPrices.ZIL
    // individualStream.swaps.map(swap => {
    //   alpha.forex.rate(swap.asset, streamData.baseAsset).then(data => {
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
// an aggregation of swap trades within the class.This is done by mapping (looping)
// over the streams.swaps array of objects.

  let swapsData = individualStream.swaps.map(swapObject => {
      //DATA GENERATION - totalamtSWAPPED + SWAPPEDTRADES
      let totalAmtSwapped, totalAmtSwappedBase = 0

      const swappedTrades = trades.filter(trade => swapObject.tradeIDs.includes(trade.id))

      swappedTrades.forEach(trade => {
        if (trade.position==="open") {
          totalAmtSwapped += trade.amt
          totalAmtSwappedBase += trade.value
        }
      })
      //FINDING AVGSWAPPEDPRICE
      const totalSwappedPrice = swappedTrades.filter(trade=> trade.position==="open").map(trade => trade.price)
      const avgPurchasePriceInBaseAsset = totalSwappedPrice/swappedTrades.filter(trade=> trade.position==="open").length
      // console.log("avgPurchasePriceInBaseAsset",avgPurchasePriceInBaseAsset)
      //VALUE ASSIGNMENT
      swapObject.swapTrades = swappedTrades
      swapObject.totalAmtSwapped = totalAmtSwapped
      swapObject.totalAmtSwappedBase = totalAmtSwappedBase
      swapObject.avgPurchasePriceInBaseAsset = avgPurchasePriceInBaseAsset
      return swapObject
    })




  //**********************************************
  //*             Returns Data
  //**********************************************

  let returnsData = {
    //CLOSED RETURNS
    realizedReturnsPercentage: ((streamData.avgClosePrice() / streamData.avgPurchasePrice()) - 1)*100,
    weightClosed: streamData.totalAmtSold() / streamData.totalAmtPurchased(),
    closedTradeReturnsAbsolute: function () {
      return this.realizedReturnsPercentage * this.weightClosed
    },
    //SWAPS
    unrealizedReturnsSwapsPercentage: (swapsCurrentPrices["ZIL"]/swapsData[0].avgPurchasePriceInBaseAsset - 1)*100,
    weightSwaps: swapsData[0].totalAmtSwappedBase / streamData.totalAmtPurchased(),
    swapsTradeReturnsAbsolute: function() {
      return this.unrealizedReturnsSwapsPercentage * this.weightSwaps
    },
    //OPEN RETURNS
    unrealizedReturnsPercentage: ((currentPrice / streamData.avgPurchasePrice()) - 1)*100,
    weightOpen: function() {
      return (1 - this.weightClosed - this.weightSwaps)
    },
    openTradeReturnsAbsolute: function() {
      return this.unrealizedReturnsPercentage * this.weightOpen()
    },
    streamReturns: function() {
      return this.closedTradeReturnsAbsolute() + this.openTradeReturnsAbsolute() + this.swapsTradeReturnsAbsolute()
    }

  }

console.log("swapsData[0].totalAmtSwappedBase",swapsData[0].totalAmtSwappedBase)


  //**********************************************
  //*             Supplying data into Row
  //**********************************************
    var rowData = {
      date: streamData.latestDate(),
      id: individualStream.id,
      asset: individualStream.asset,
      avgPurchasePrice: Math.round(streamData.avgPurchasePrice()*100)/100,
      currentPrice: Math.round(currentPrice*100)/100,
      purchaseValue: Math.round(streamData.totalSpentOpenNominal()*100)/100,
      currentValue: Math.round(currentValue*100)/100,
      returns: Math.round(returnsData.streamReturns()*100)/100
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
      <div>
      weights:
      <p>Closed: {returnsData.weightClosed}</p>
      <p>Swaps: {returnsData.weightSwaps}</p>
      <p>Open: {returnsData.weightOpen}</p>
      </div>
      </>
    )

}

export default TableRow
