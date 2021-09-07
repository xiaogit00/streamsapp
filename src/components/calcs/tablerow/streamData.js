//**********************************************
//*             Calculations for streamData
//**********************************************
//
import { nominal_value } from '../../utils'


const streamData = (individualStream, trades, globalDenom) => {
  const streamDataObject = {
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

      const nominalValueTradesOpen = this.openTrades().map(trade => {
        // console.log("trade.value",typeof trade.value)
        // console.log("nominal_value(trade.value, trade.value_denom, globalDenom)",nominal_value(trade.value, trade.value_denom, globalDenom))
        return nominal_value(trade.value, trade.value_denom, globalDenom)
      })
      const totalSpentOpenNominal = nominalValueTradesOpen.reduce((a, nominalValue) => a + nominalValue,0)
      return totalSpentOpenNominal
    },
    totalCashedOutNominal: function () {
      const nominalValueTradesClosed = this.closedTrades().map(trade => nominal_value(trade.value, trade.value_denom, globalDenom))
      const totalCashedOutNominal = nominalValueTradesClosed.reduce((a, nominalValue) => a + nominalValue,0)
      return totalCashedOutNominal
    },
    totalAmtPurchased: function() {
      return this.openTrades().reduce((a, trade) => a + trade.amt,0)
    },
    totalAmtSold: function () {
      return this.closedTrades().reduce((a, trade) => a + trade.amt,0)
    },
    totalValueSoldNominal: function () {

    },
    avgPurchasePrice: function() {
      const avgPurchasePrice = this.totalSpentOpenNominal() / this.totalAmtPurchased()
      return avgPurchasePrice
    },
    avgClosePrice: function() {
      return this.totalCashedOutNominal() / this.totalAmtSold()
    },
    avgPurchaseValueNominal: function() {
      return this.avgPurchasePrice() * this.totalAmtPurchased()
    }
  }
  return streamDataObject
}

export default streamData
