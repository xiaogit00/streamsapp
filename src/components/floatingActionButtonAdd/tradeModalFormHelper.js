import styled from 'styled-components'
import tickerService from 'services/tickerService'
import coinService from 'services/coinService'
//**********************************************************
//*                    STYLED COMPONENTS
//**********************************************************
export const Form = styled.form`
    height: 69vh;
`

export const HeaderText = styled.p`
    font-family: Calibri, sans-serif;
    font-size: 1.3em;
    /* font-weight: lighter; */
    color: #5E5E5E;
`
export const ModalBody = styled.div`
    /* border: 0.5px solid green; */
    height: 87%;
    display: flex;
    padding-left: 2em;
    padding-right: 2em;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;

`

export const ModalFooter = styled.div`
    /* border: 0.5px solid maroon; */
    background-color: #F8F8F8;
    position: relative;
    height: 12.5%;
    padding-left: 30%;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
//**********************************************************
//*                    Initial Value
//**********************************************************
export const initialFValues = {
    date: {},
    assetClass: '',
    asset: '',
    ticker:'',
    coinId:'',
    isSwap: 'false',
    assigned: false,
    orderType: '',
    platform: '',
    position: 'open',
    price: '',
    priceDenom:'',
    amt:'',
    value: '',
    valueDenom:'',
    fees: '',
    feesDenom: '',
    comments:''

}

export const tradeAssetClassMenu = [
    'Crypto',
    'Stocks',
    'ETF'
]

export let coinMenuItems = async (coinSymbol) => {
    const foundCoins = await coinService.find(coinSymbol)

    return foundCoins
}

export let tickerMenuItems = async (assetName) => {
    if (assetName !== '') {
        const foundTickers = await tickerService.find(assetName)
        //Here, I want to create an array that looks like this:
        // {ticker: 'AAPL', display: 'Apple - AAPL | NYSE '}


        //Returns an object (ticker, display)
        const menuItems = foundTickers.map(ticker => {
            const display = `${ticker.name} - ${ticker.symbol} (${ticker.stock_exchange.acronym})`
            return {
                ticker: ticker.symbol,
                exchange: ticker.stock_exchange.acronym,
                display
            }
        })
        return menuItems
    } else {
        return ''
    }

}


export const currencies = [
    { label: 'SGD' },
    { label: 'USD' },
    { label: 'CNY' },
    { label: 'GBP' }
]

export const orderTypeMenuItems = [
    'Limit Buy',
    'Limit Sell',
    'Market Buy',
    'Market Sell',
    'Swap',
    'Stop Loss',
    'Take Profit'
]
//**********************************************************
//*                    HANDLERS
//**********************************************************
