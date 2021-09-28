//**********************************************
//*             Calculations for swapsData
//*    GENERATES AN ARRAY OF SWAP OBJECTS
//**********************************************
//This should return an array of objects, one object for each asset
// Each swap object:
// Contains the following fields:
// asset, tradeIDs, swapTrades, totalAmtSwapped, totalAmtSwappedBase,
// avgPurchasePriceInBaseAsset, closedAmtSwapBase, openAmtSwapBase
// netOpenSwapAmtInBaseAsset
import streamData from './streamData'
import { nominal_value } from '../../utils'
const alpha = require('alphavantage')({ key: 'LY78Q3KY7IUG1KFL' })

const swapsData = (individualStream, trades, globalDenom) => {
    const stream = streamData(individualStream, trades, globalDenom)
    // console.log("individualStream.swaps",individualStream.swaps)
    let swaps = individualStream.swaps.map(swapObject => { //this maps over each swap asset-- returns a list of swapObjects (one for each asset)
    // console.log("SwapsData is entered")
    //**********************************************
    //*            Swap Trades Filtering, Open/Close Amount
    //**********************************************
        //DATA GENERATION - totalamtSWAPPED + swapTrades
        let totalAmtSwappedInSwapped = 0
        let totalAmtSwappedBase = 0 //initializing for calculations
        const swapTrades = trades.filter(trade => swapObject.trades.includes(trade.id)) // all the swap trades within an asset

        const openSwapTrades = swapTrades.filter(trade => trade.position === 'open')
        const closedSwapTrades = swapTrades.filter(trade => trade.position === 'closed')
        const openAmtSwapInSwap = openSwapTrades.reduce((a, trade) => a + trade.amt, 0)
        const closedAmtSwapInSwap = closedSwapTrades.reduce((a, trade) => a + trade.amt, 0)
        const netOpenAmtSwapInSwap = openAmtSwapInSwap - closedAmtSwapInSwap

        // console.log("netOpenAmtSwapInSwap",netOpenAmtSwapInSwap)

        const openAmtSwapBase = openSwapTrades.reduce((a, trade) => a + trade.value, 0)
        const closedAmtSwapBase = closedSwapTrades.reduce((a, trade) => {

            if (trade.valueDenom === individualStream.asset) {

                return a + trade.value
            } else {
                // console.log("THIS WAS DONE",individualStream.asset )
                // console.log(a + nominal_value(trade.value, trade.value_denom, individualStream.asset))
                return a + nominal_value(trade.value, trade.valueDenom, individualStream.asset)
            }
        }, 0)

        const netOpenSwapAmtInBaseAsset = openAmtSwapBase - closedAmtSwapBase
        // console.log("netOpenSwapAmtInBaseAsset",netOpenSwapAmtInBaseAsset)

        //**********************************************
        //*            Swap Open/Close Weights relative to Base
        //**********************************************
        // const weightOpen = netOpenSwapAmtInBaseAsset / stream.totalAmtPurchased()
        // const weightClosed = closedAmtSwapBase / stream.totalAmtPurchased()
        // console.log("weightOpen",weightOpen)
        // console.log("closedAmtSwapInSwap",closedAmtSwapInSwap)
        //**********************************************
        //*             Summing Open Amt to get SwapAmt (to calc weight of Swap)
        //**********************************************
        swapTrades.forEach(trade => { //calculating totalAmtSwapped (in swapCurrency, e.g. ZIL)
            if (trade.position==='open') {

                totalAmtSwappedInSwapped += trade.amt

                totalAmtSwappedBase += trade.value //...and in Base currency (e.g.BTC)
            }
        })

        const percentageClosed = closedAmtSwapInSwap /totalAmtSwappedInSwapped

        const weightClosed = (percentageClosed * totalAmtSwappedBase) / stream.totalAmtPurchased()
        const weightOpen = (1-percentageClosed) * totalAmtSwappedBase / stream.totalAmtPurchased()

        //**********************************************
        //*             Average Purchase Price in BTC across Open Swaps
        //**********************************************
        const totalOpenSwappedPriceInBase = swapTrades.filter(trade=> trade.position==='open').map(trade => trade.price)
        const avgPurchasePriceInBaseAsset = totalOpenSwappedPriceInBase/swapTrades.filter(trade=> trade.position==='open').length
        // console.log("avgPurchasePriceInBaseAsset",avgPurchasePriceInBaseAsset)
        // console.log("avgPurchasePriceInBaseAsset",avgPurchasePriceInBaseAsset)

        //**********************************************
        //*             Current Value Swap Open
        //**********************************************
        // COMMENTED OUT API CALL FOR DEVELOPMENT
        // const currentPriceofSwapInGlobalDenom = alpha.forex.rate(swapObject.asset, globalNominalDenom).then(res => {
        //                                           console.log("Swap price is called through API")
        //                                           return res["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        //                                         })
        const currentPriceofSwapInGlobalDenom = (swapObject.asset === 'ETH') ? 5016 : 0.151999
        // console.log("currentPriceofSwapInGlobalDenom",currentPriceofSwapInGlobalDenom)

        const totalAmtOpenSwappedInSwapped = swapTrades
        const currentValueofSwapOpenNominal = netOpenAmtSwapInSwap * currentPriceofSwapInGlobalDenom
        // console.log("currentValueofSwapOpenNominal",currentValueofSwapOpenNominal)
        const netPurchaseValueOfSwapInBaseAsset = netOpenAmtSwapInSwap * avgPurchasePriceInBaseAsset
        // console.log("netPurchaseValueOfSwapInBaseAsset",netPurchaseValueOfSwapInBaseAsset)
        const avgSwapPurchaseValueNominal = netPurchaseValueOfSwapInBaseAsset * stream.avgPurchasePrice()


        const avgValueSwapClosedNominal = () => {
            let totalValueClosedNominal = 0
            for (let i=0; i<closedSwapTrades.length; i++) {
                if (closedSwapTrades[i].valueDenom !== globalDenom) {
                    totalValueClosedNominal += nominal_value(closedSwapTrades[i].value, closedSwapTrades[i].valueDenom, globalDenom)
                } else {
                    totalValueClosedNominal += closedSwapTrades[i].value
                }
            }
            const avgValueSwapClosedNominal = totalValueClosedNominal/closedSwapTrades.length
            return avgValueSwapClosedNominal
        }

        //**********************************************
        //*             Unrealized and Realized Returns
        //**********************************************
        const unrealizedReturnsSwapPercentage = ((currentValueofSwapOpenNominal / avgSwapPurchaseValueNominal)-1)*100
        const weightOfOpenSwap = netOpenAmtSwapInSwap / totalAmtSwappedInSwapped
        const unrealizedReturnsSwapAbsolute = unrealizedReturnsSwapPercentage * weightOfOpenSwap //GOOD - checked

        const purchaseValueOfSwappedComponentNominal = stream.avgPurchaseValueNominal() * weightClosed

        const realizedClosedReturnsSwapPercentage = ((avgValueSwapClosedNominal() / purchaseValueOfSwappedComponentNominal)-1)*100
        // console.log("realizedClosedReturnsSwapPercentage",realizedClosedReturnsSwapPercentage)
        const weightOfClosedSwap = 1 - weightOfOpenSwap
        const realizedClosedReturnsSwapAbsolute = weightClosed * realizedClosedReturnsSwapPercentage * weightOfClosedSwap
        // console.log("realizedClosedReturnsSwapAbsolute",realizedClosedReturnsSwapAbsolute)
        //**********************************************
        //*             Appending Data to Swap Object
        //**********************************************

        swapObject.totalAmtSwappedInSwapped = totalAmtSwappedInSwapped
        swapObject.totalAmtSwappedBase = totalAmtSwappedBase
        swapObject.avgPurchasePriceInBaseAsset = avgPurchasePriceInBaseAsset
        swapObject.closedAmtSwapBase = closedAmtSwapBase
        swapObject.openAmtSwapBase = openAmtSwapBase
        swapObject.netOpenSwapAmtInBaseAsset = netOpenSwapAmtInBaseAsset
        swapObject.currentValueofSwapOpenNominal = currentValueofSwapOpenNominal
        swapObject.weightOpen = weightOpen
        swapObject.weightClosed = weightClosed
        swapObject.unrealizedReturnsSwapAbsolute = unrealizedReturnsSwapAbsolute
        swapObject.realizedClosedReturnsSwapPercentage = realizedClosedReturnsSwapPercentage
        swapObject.realizedClosedReturnsSwapAbsolute = realizedClosedReturnsSwapAbsolute
        // console.log("swapObject",swapObject)
        // console.log("this is swapObject.totalAmtSwappedInSwapped", swapObject.totalAmtSwappedInSwapped)
        // console.log("swapObject", swapObject)
        return swapObject


    })

    return swaps
}

export default swapsData
