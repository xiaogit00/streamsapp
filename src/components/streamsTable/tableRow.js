import React, { useState, useEffect } from 'react'
import 'App.css'
import TableRowItems from 'components/streamsTable/tableRowItems'
import TableRowProgressBarV2 from 'components/streamsTable/tableRowProgressBarV2'
import { nominal_value } from 'components/utils'
import streamData from 'components/calcs/tablerow/streamData'
import swapsData from 'components/calcs/tablerow/swapsData'
import returnsDataWithSwap from 'components/calcs/tablerow/returnsDataWithSwap'
import returnsData from 'components/calcs/tablerow/returnsData'
import StreamBar from 'components/streamBar/streamBar'
import styled from 'styled-components'
// import unrealizedReturnsSwaps from './calcs/tablerow/unrealizedReturnsSwaps'
const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' })


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

const TableRow = ({individualStream, trades, globalDenom, num}) => {


    // const [swapsCurrentPrices, setSwapsCurrentPrices] = useState([])
    const swapsCurrentPrices = []

    //**********************************************
    //*             Data Prep - trades, date, total open/closed amts, avg price
    //**********************************************
    // Returns a stream object with following fields:
    // tradesInStream,filteredTrades,baseAsset,openTrades(),closedTrades(),latestDate(),totalSpentOpenNominal(),totalCashedOutNominal(),totalAmtPurchased(),totalAmtSold(),avgPurchasePrice(),avgClosePrice()
    const stream = streamData(individualStream, trades, globalDenom)
    // console.log("stream within the tableRow: ", stream.totalSpentOpenNominal())
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

    swapsCurrentPrices['ZIL'] = 0.00000232
    swapsCurrentPrices['ETH'] = 0.07416300
    let currentPrice = 0
    let currentValue = 0
    if (globalDenom === 'SGD') {
        if (individualStream.asset === 'BTC') {
            currentPrice = 64217

        } else if (individualStream.asset === 'ETH') {
            // console.log(individualStream.asset)
            currentPrice = 5067
        } else if (individualStream.asset === 'Alibaba') {
            // console.log(individualStream.asset)
            currentPrice = 28.86
        } else if (individualStream.asset === 'Xiaomi') {
            // console.log(individualStream.asset)
            currentPrice = 4.37
        } else if (individualStream.asset === 'JD.com') {

            currentPrice = 53.74
        } else if (individualStream.asset === 'HST') {
            // console.log(individualStream.asset)
            currentPrice = 1.132
        } else if (individualStream.asset === 'Tencent') {
            // console.log(individualStream.asset)
            currentPrice = 84.32
            // console.log(individualStream.asset)
            // console.log(stream.totalSpentOpenNominal())
        }
    } else if (globalDenom === 'USD') {
        if (individualStream.asset === 'BTC') {
            currentPrice = 47520
        } else if (individualStream.asset === 'ETH') {
            // console.log(individualStream.asset)
            currentPrice = 5067*0.744
        } else if (individualStream.asset === 'Alibaba') {
            // console.log(individualStream.asset)
            currentPrice = 28.86*0.744
        } else if (individualStream.asset === 'Xiaomi') {
            // console.log(individualStream.asset)
            currentPrice = 4.37*0.744
        } else if (individualStream.asset === 'JD.com') {

            currentPrice = 53.74*0.744
        } else if (individualStream.asset === 'HST') {
            // console.log(individualStream.asset)
            currentPrice = 1.132*0.744
        } else if (individualStream.asset === 'Tencent') {
            // console.log(individualStream.asset)
            currentPrice = 84.32*0.744
            // console.log(individualStream.asset)
            // console.log(stream.totalSpentOpenNominal())
        }
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

    if (individualStream.swaps.length > 0) {
        // console.log("this is individualStream.swaps within tableRow", individualStream.swaps)
        swaps = swapsData(individualStream, trades, globalDenom)
        weights.swapOpen = swaps[0].weightOpen*100
        weights.swapClosed = swaps[0].weightClosed*100
        weights.closed = (stream.totalAmtSold() / stream.totalAmtPurchased())*100

        weights.open = (100 - weights.closed - (weights.swapOpen + weights.swapClosed))

        // console.log(swaps)
        //**********************************************
        //*             Returns Data
        //**********************************************
        returns = returnsDataWithSwap(stream, trades, swaps, currentPrice, globalDenom)
    } else {
        returns = returnsData(stream, trades, currentPrice, globalDenom)
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }




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
                <StreamBar columnStyle={columnStyle}
                    streamID={num}
                    asset={individualStream.asset}
                    avgPurchasePrice={Math.round(stream.avgPurchasePrice()*100)/100}
                    curPrice={Math.round(currentPrice*100)/100}
                    purchaseValue={Math.round(stream.totalSpentOpenNominal()*100)/100}
                    currentValue={Math.round(stream.totalAmtPurchased()*currentPrice*100)/100}
                    returns={Math.round(returns*100)/100}
                    weights={weights}
                    avgClosePrice={Math.round(stream.avgClosePrice()*100/100)}
                    realizedReturns={Math.round(((stream.avgClosePrice() / stream.avgPurchasePrice()) - 1)*100*100/100)}
                    globalDenom={globalDenom}
                />

            </div>


        </>
    )

}

export default TableRow

// COMMENTED OUT JSX

// <TableRowItems rowData={rowData}/>
// <TableRowProgressBarV2 weights={weights}/>
