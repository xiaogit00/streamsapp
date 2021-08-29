import React, { useState, useEffect } from 'react'
import '../App.css'
import TableRowItems from './tableRowItems'
const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' });



const TableRow = ({individualStream, trades}) => {
  //**********************************************
//*             Debugging
//**********************************************
  // console.log("Streams from table row: ", stream)
  // console.log("Trades from table row: ", trades)
  // const [rowData, setRowData] = useState({})
  //**********************************************
//*             Nominal value config
//**********************************************
  const globalNominalDenom = "SGD"
  //**********************************************
  //*             ExchangeRate Object
  //**********************************************
  // For converting between currencies
  // Example: To get the exchangeRate for SGD/USD
  //        -[Querying statically] exchangeRates.SGD.USD
  //        -[Querying with arguments(dynamically)] exchangeRates[arg1][arg2]
  const exchangeRates = {
    SGD: {
      USD: 0.74,
      BTC: 0.000015,
      ETH: 0.00023,
      SGD: 1
    },
    USD: {
      SGD: 1.35,
      BTC: 0.000021,
      ETH: 0.00032,
      USD: 1
    }
  }
  //**********************************************
  //*             Function Dependencies
  //**********************************************
  // FUNCTION FOR CALCULATING NOMINAL VALUE OF AN ASSET
  // BY SUPPLYING 3 ARGUMENTS (base value, base currency, global_Nominal)
  // Has one dependency variable: exchangeRates
  const nominal_value = (tradeValue, tradeValueDenom, nominalDenom) => {
    const rate = exchangeRates[tradeValueDenom][nominalDenom]
    return tradeValue * rate
  }
  const [currentPrice, setCurrentPrice] = useState("")
  const [currentValue, setCurrentValue] = useState("")
  const [returns, setReturns] = useState("")
  //**********************************************
  //*          Sets calculations if Stream is set (prevents
//             Can't get past first render problem)
  //**********************************************
  // if (individualStream) {
    //**********************************************
    //*             Prepares row data
    //    - Gets relevant trades
    //    - generates latest date from trades
    //    - Calculates average purchase price across trades
    //    - stores everything in rowData variable
    //
    //**********************************************
    const tradesInStream = individualStream.trades
    //Filters
    const filteredTrades = trades.filter(trade => tradesInStream.includes(trade.id))
    console.log("filteredTrades",filteredTrades)
    const openTrades = filteredTrades.filter(trade => trade.position === "open")
    const closedTrades = filteredTrades.filter(trade => trade.position === "closed")

    //**********************************************
    //*            Swap Data prep 27 AUG WORKING ON THIS
    //**********************************************
    const swapIDs = []
    individualStream.swaps.map(swap => swap.tradeIDs.map(tradeID => swapIDs.push(tradeID)))
    console.log("swapIDs",swapIDs)
    //**********************************************
    //*            DELETED SWAP DATA
    //**********************************************

    // const swappedOutTrades = swaps.filter(trade=> trade.orderType === "Swap Out")
    // console.log("swappedOutTrades",swappedOutTrades)
    const latestDate = new Date(Math.max(...openTrades.map(trade => new Date(trade.date))))
    // console.log("openTrades",openTrades)
    // console.log("closedTrades",closedTrades)
    //**********************************************
    //*            Generate avgPurchasePrice
    //**********************************************
    const nominalValueTrades = openTrades.map(trade => nominal_value(trade.value, trade.value_denom, globalNominalDenom))
    console.log("nominalvales", nominalValueTrades)
    //^returns an array of nominalValuesof trades [30000, 13322, 56555]
    const totalSpentNominal = nominalValueTrades.reduce((a, nominalValue) => a + nominalValue,0)
    //^sums up nominalValuesTrades --> read: total spent for that asset in nominal terms
    const totalAmtPurchased = openTrades.reduce((a, trade) => a + trade.amt,0)
    //^add up all the amount within filteredTrades.
    const avgPurchasePrice = totalSpentNominal / totalAmtPurchased
    //**********************************************
    //*             Get Avg Close Price
    //**********************************************
    const nominalValueTradesClosed = closedTrades.map(trade => nominal_value(trade.value, trade.value_denom, globalNominalDenom))
    const totalGainedNominal = nominalValueTradesClosed.reduce((a, nominalValue) => a + nominalValue,0)
    const totalAmtSold = closedTrades.reduce((a, trade) => a + trade.amt,0)
    console.log("totalAmtSold",totalAmtSold)
    const avgClosePrice = totalGainedNominal / totalAmtSold
    console.log("avgClosePrice",avgClosePrice)

    //**********************************************
    //*             Getting Amt Swapped and Weight swapped
    //**********************************************
    // const totalAmtSwapped = swappedOutTrades.reduce((a, trade)=> a + trade.value, 0)
    // console.log("totalAmtSwapped",totalAmtSwapped)
    // const weightSwapped = totalAmtSwapped / totalAmtPurchased
    //**********************************************
    //*           Calculating returns on swaps
    //**********************************************
  //   useEffect(() => {
  //     alpha.forex.rate('ZIL', individualStream.asset).then(data => {
  //       console.log(data)
  //     })
  //   })
  // }, [])
  //   const swapLiveReturns = () => {
  //     const currentPrice =
  //     const purchasePrice = 0.00000276
  //   }
  //
    //**********************************************
    //*             Generate current price
    //**********************************************
//     const aapl = async () => await yahooFinance.quote({
//   symbol: 'AAPL',
//   modules: [ 'price', 'summaryDetail' ] // see the docs for the full list
// })
//     console.log(aapl())

    useEffect(() => {
      alpha.forex.rate(individualStream.asset, globalNominalDenom).then(data => {
        setCurrentPrice(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
        setCurrentValue(totalAmtPurchased*data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
        setReturns(totalAmtPurchased*data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]/totalSpentNominal)
      })
    }, [])
    //**********************************************
    //*             Get closedTradeReturns & Stream Returns
    //**********************************************
    const realizedReturnsPercentage = ((avgClosePrice / avgPurchasePrice) - 1)*100
    // console.log("realizedReturnsPercentage",realizedReturnsPercentage)
    const weightClosed = totalAmtSold / totalAmtPurchased
    // console.log("weightClosed",weightClosed)
    const closedTradeReturnsAbsolute = realizedReturnsPercentage * weightClosed
    // console.log("closedTradeReturnsAbsolute",closedTradeReturnsAbsolute)
    const unrealizedReturnsPercentage = ((currentPrice / avgPurchasePrice) - 1)*100
    const weightOpen = (1 - weightClosed)
    // console.log("unrealizedReturnsPercentage",unrealizedReturnsPercentage)
    const openTradeReturnsAbsolute = unrealizedReturnsPercentage * weightOpen
    // console.log("openTradeReturnsAbsolute", openTradeReturnsAbsolute)
    const streamReturns = closedTradeReturnsAbsolute + openTradeReturnsAbsolute

    // const openTradeReturns = (1-weightClosed) * (currentPrice/avgPurchasePrice)
    // console.log("closedTradeReturns",closedTradeReturns)
    // console.log("openTradeReturns",openTradeReturns)
    // console.log("together",openTradeReturns+closedTradeReturns)
    //**********************************************
    //*             Adding everything into rowData
    //**********************************************

    var rowData = {
      date: latestDate,
      id: individualStream.id,
      asset: individualStream.asset,
      avgPurchasePrice: Math.round(avgPurchasePrice*100)/100,
      currentPrice: Math.round(currentPrice*100)/100,
      purchaseValue: Math.round(totalSpentNominal*100)/100,
      currentValue: Math.round(currentValue*100)/100,
      returns: Math.round(streamReturns*100)/100

    }

  //**********************************************
//*             Rendering
//**********************************************
    // console.log("value of rowData within tableRow: ", rowData)
    return (
      <div className="table-row-flex-container">
        <TableRowItems rowData={rowData}/>
        {console.log("value of rowData within JSX: ", rowData)}
      </div>
    )

}

export default TableRow
