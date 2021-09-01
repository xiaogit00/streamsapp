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


  const [currentPrice, setCurrentPrice] = useState("")
  const [currentValue, setCurrentValue] = useState("")


  //**********************************************
  //*             Data Prep - trades, date, total open/closed amts, avg price
  //**********************************************
  let streamData = {
    tradesInStream: individualStream.trades,
    filteredTrades: function() {
      return trades.filter(trade => this.tradesInStream.includes(trade.id))
    },
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
  useEffect(() => {
    alpha.forex.rate(individualStream.asset, globalNominalDenom).then(res => {
      setCurrentPrice(res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
      setCurrentValue(streamData.totalAmtPurchased()*res["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
    })
  }, [])
  //**********************************************
  //*             Returns Data
  //**********************************************

  let returnsData = {
    realizedReturnsPercentage: ((streamData.avgClosePrice() / streamData.avgPurchasePrice()) - 1)*100,
    weightClosed: streamData.totalAmtSold() / streamData.totalAmtPurchased(),
    closedTradeReturnsAbsolute: function () {
      return this.realizedReturnsPercentage * this.weightClosed
    },
    unrealizedReturnsPercentage: ((currentPrice / streamData.avgPurchasePrice()) - 1)*100,
    weightOpen: function() {
      return (1 - this.weightClosed)
    },
    openTradeReturnsAbsolute: function() {
      return this.unrealizedReturnsPercentage * this.weightOpen()
    },
    streamReturns: function() {
      return this.closedTradeReturnsAbsolute() + this.openTradeReturnsAbsolute()
    },
  }


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
      <div className="table-row-flex-container">
        <TableRowItems rowData={rowData}/>
      </div>
    )

}

export default TableRow
