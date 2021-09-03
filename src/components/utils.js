import { exchangeRates } from './exchangeRates'
//example call: nominal_value("5000", "USD", "SGD")
export const nominal_value = (tradeValue, tradeValueDenom, nominalDenom) => {
  const rate = exchangeRates[tradeValueDenom][nominalDenom]
  return tradeValue * rate
}
