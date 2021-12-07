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
import currentPriceService from 'services/currentPriceService'
import exchangeService from 'services/exchangeService'
// import unrealizedReturnsSwaps from './calcs/tablerow/unrealizedReturnsSwaps'

import interceptorService from 'services/interceptorService'



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
    const [currentPrice, setCurrentPrice] = useState(0)
    console.log('tablerow is entered')
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

    useEffect(() => {
        console.log('useEffect is entered ')

        if (individualStream.assetClass === 'Stocks') {
            // currentPriceService.fetchPriceForStock(individualStream.ticker)
            //     .then(response => response.data[0].open)
            //     .then(unconvertedPrice => {
            //         const baseDenom = individualStream.exchangePriceDenom
            //         const conversionRate = exchangeService.exchange(baseDenom, globalDenom)
            //             .then(data => data.conversion_rate)
            //             .then(response => setCurrentPrice(response * unconvertedPrice))
            //     })
            const getCurrentPrice = async () => {
                const baseDenom = individualStream.exchangePriceDenom

                const stockPrice = currentPriceService.fetchPriceForStock(individualStream.ticker)

                const conversionRate = exchangeService.exchange(baseDenom, globalDenom)

                let values = await Promise.all([stockPrice, conversionRate])
                const newPrice = values[0][0].open * values[1].conversion_rate
                setCurrentPrice(newPrice)
            }
            getCurrentPrice().catch(e => {
                console.log('[TableRow]There\'s a problem with getting current price for: ', individualStream.asset)
                console.log('[TableRow]this is the error request if it\'s cached:', e)
                // setCurrentPrice(0)
            })

            // } else if (individualStream.assetClass === 'ETF') {
            //     const getCurrentPrice = async () => {
            //         const baseDenom = individualStream.exchangePriceDenom
            //         const etfPrice = currentPriceService.fetchPriceForETF(individualStream.ticker)
            //
            //         const conversionRate = exchangeService.exchange(baseDenom, globalDenom)
            //         const values = await Promise.all([etfPrice, conversionRate])
            //         const newPrice = values[0].price.regularMarketPrice.raw * values[1].conversion_rate
            //         setCurrentPrice(newPrice)
            //     }
            //     getCurrentPrice()

        } else if (individualStream.assetClass === 'Crypto') {
            currentPriceService.fetchPriceForCrypto(individualStream.coinId, globalDenom)
                .then(response => {
                    setCurrentPrice(response[individualStream.coinId][globalDenom.toLowerCase()])
                })
                .catch(err => {
                    console.log(err)
                    setCurrentPrice('Failed')
                })
        }
    }, [globalDenom])


    //

    //**********************************************************
    //*   STATIC VALUES TO USE FOR TESTING - COMMENT OFF WHEN TURNING ON API
    //**********************************************************

    // swapsCurrentPrices['ZIL'] = 0.00000232
    // swapsCurrentPrices['ETH'] = 0.07416300
    // let currentPrice = 0
    // let currentValue = 0
    // if (globalDenom === 'SGD') {
    //     if (individualStream.asset === 'BTC') {
    //         currentPrice = 64217
    //
    //     } else if (individualStream.asset === 'ETH') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 5067
    //     } else if (individualStream.asset === 'Alibaba') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 28.86
    //     } else if (individualStream.asset === 'Xiaomi') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 4.37
    //     } else if (individualStream.asset === 'JD.com') {
    //
    //         currentPrice = 53.74
    //     } else if (individualStream.asset === 'HST') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 1.132
    //     } else if (individualStream.asset === 'Tencent') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 84.32
    //         // console.log(individualStream.asset)
    //         // console.log(stream.totalSpentOpenNominal())
    //     }
    // } else if (globalDenom === 'USD') {
    //     if (individualStream.asset === 'BTC') {
    //         currentPrice = 47520
    //     } else if (individualStream.asset === 'ETH') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 5067*0.744
    //     } else if (individualStream.asset === 'Alibaba') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 28.86*0.744
    //     } else if (individualStream.asset === 'Xiaomi') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 4.37*0.744
    //     } else if (individualStream.asset === 'JD.com') {
    //
    //         currentPrice = 53.74*0.744
    //     } else if (individualStream.asset === 'HST') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 1.132*0.744
    //     } else if (individualStream.asset === 'Tencent') {
    //         // console.log(individualStream.asset)
    //         currentPrice = 84.32*0.744
    //         // console.log(individualStream.asset)
    //         // console.log(stream.totalSpentOpenNominal())
    //     }
    // }


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
        fontFamily: 'Calibri, sans-serif'
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
                    id={individualStream.id}
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
