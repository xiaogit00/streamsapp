
// import React, { useState, useEffect } from 'react'
var globalNominalDenom = require('../../../config.json').globalNominalDenom;


// const [currentPrice, setCurrentPrice] = useState(null)
// const [currentValue, setCurrentValue] = useState(null)



  const returnsData = (stream, trades, currentPrice) => {
    const realizedReturnsPercentage = ((stream.avgClosePrice() / stream.avgPurchasePrice()) - 1)*100 || 0
    // console.log("realizedReturnsPercentage",realizedReturnsPercentage)
    const weightClosed = stream.totalAmtSold() / stream.totalAmtPurchased()
    // console.log("weightClosed",weightClosed)
    const closedTradeReturnsAbsolute = realizedReturnsPercentage * weightClosed
    // console.log("closedTradeReturnsAbsolute",closedTradeReturnsAbsolute)
    const unrealizedReturnsPercentage = ((currentPrice / stream.avgPurchasePrice()) - 1)*100
        // console.log("currentPrice",currentPrice, stream.avgPurchasePrice())
    const weightOpen = (1 - weightClosed)
    // console.log("unrealizedReturnsPercentage",unrealizedReturnsPercentage)
    const openTradeReturnsAbsolute = unrealizedReturnsPercentage * weightOpen
    // console.log("openTradeReturnsAbsolute", openTradeReturnsAbsolute)
    const streamReturns = closedTradeReturnsAbsolute + openTradeReturnsAbsolute


    return streamReturns
}

export default returnsData
