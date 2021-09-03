// import React, { useState, useEffect } from 'react'
var globalNominalDenom = require('../../../config.json').globalNominalDenom;


// const [currentPrice, setCurrentPrice] = useState(null)
// const [currentValue, setCurrentValue] = useState(null)



  const returnsDataWithSwap = (stream, trades, swaps, currentPrice, currentValue) => {
    //**********************************************
    //*             Weight Allocation
    //**********************************************
    const weightClosed = stream.totalAmtSold() / stream.totalAmtPurchased()
    // const weightSwaps = swaps.totalAmtSwappedBase / stream.totalAmtPurchased()
    //Okay weightSwaps is an AGGREGATION across all swap objects taking their combined totalAmtSwappedBase
    const weightSwaps = (swaps.map(swap => swap.totalAmtSwappedBase).reduce((a, totalAmtSwappedBase) => a + totalAmtSwappedBase, 0))/stream.totalAmtPurchased()
    const weightOpen = 1 - weightClosed - weightSwaps

    //**********************************************
    //*             Closed Trade Returns Data
    //**********************************************
    const realizedReturnsPercentage = ((stream.avgClosePrice() / stream.avgPurchasePrice()) - 1)*100
    // console.log("weightClosed",weightClosed)
    // console.log("weightSwaps",weightSwaps)
    // console.log("weightOpen",weightOpen)
    //
    // console.log("stream.totalAmtPurchased()",stream.totalAmtPurchased())
    // console.log("stream.totalAmtSold()",stream.totalAmtSold())
    const closedTradeReturnsAbsolute = realizedReturnsPercentage * weightClosed
    //**********************************************
    //*             Open Trade Returns Data
    //**********************************************
    const unrealizedReturnsPercentage = ((currentPrice / stream.avgPurchasePrice()) - 1)*100
    const openTradeReturnsAbsolute = unrealizedReturnsPercentage * weightOpen
    //**********************************************
    //*             Open Swap Returns Data
    //**********************************************
    const openSwapReturnsAbsolute = swaps.reduce((a, swap) => a + swap.unrealizedReturnsSwapAbsolute, 0)

    const closedSwapsReturnsAbsolute = swaps.reduce((a, swap) => a + swap.realizedClosedReturnsSwapAbsolute, 0)
    // console.log("swaps",swaps[0].asset)
    const streamReturns = closedTradeReturnsAbsolute
                          + openTradeReturnsAbsolute
                          + openSwapReturnsAbsolute
                          + closedSwapsReturnsAbsolute
    // console.log(`closedTradeReturnsAbsolute:${closedTradeReturnsAbsolute}\n openTradeReturnsAbsolute: ${openTradeReturnsAbsolute}\n openSwapReturnsAbsolute:${openSwapReturnsAbsolute} \n closedSwapsReturnsAbsolute:${closedSwapsReturnsAbsolute}`)
    return streamReturns
}

export default returnsDataWithSwap
