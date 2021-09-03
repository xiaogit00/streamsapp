//**********************************************
//*             Calculations for unrealizedReturnsSwaps
//**********************************************
// MAIN FORMULA:
//  unrealizedReturnsSwaps
//  = currentValueofSwapOpenNominal/ (weightSwapOpen * avgPurchaseValueNominal)
//
// The actual implementation of the formula requires 7 supporting calcs:
// 1. closedAmtSwapBase
// 2. openAmtSwapBase
// 3. netOpenAmtSwap
// 4. streamsData.totalAmtPurchased
// 5. weightSwapOpen
// 6. streamsData.avgPurchaseValueNominal
// 7. openAmtSwapSwap
// 8.currentPriceofSwap
// 9.currentValueofSwapNominal
// 10. unrealizedReturnsSwaps

// const closedAmtSwapBase
//
//
//
// export default unrealizedReturnsSwaps
