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
    height: 55px;
    bottom:0;
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
//*                    Currencies
//**********************************************************


export const currencies = [
    { label: 'AFN' },
    { label: 'EUR' },
    { label: 'ALL' },
    { label: 'DZD' },
    { label: 'USD' },
    { label: 'AOA' },
    { label: 'XCD' },
    { label: 'ARS' },
    { label: 'AMD' },
    { label: 'AWG' },
    { label: 'AUD' },
    { label: 'AZN' },
    { label: 'BSD' },
    { label: 'BHD' },
    { label: 'BDT' },
    { label: 'BBD' },
    { label: 'BYN' },
    { label: 'BZD' },
    { label: 'XOF' },
    { label: 'BMD' },
    { label: 'INR' },
    { label: 'BTN' },
    { label: 'BOB' },
    { label: 'BOV' },
    { label: 'BAM' },
    { label: 'BWP' },
    { label: 'NOK' },
    { label: 'BRL' },
    { label: 'BND' },
    { label: 'BGN' },
    { label: 'BIF' },
    { label: 'CVE' },
    { label: 'KHR' },
    { label: 'XAF' },
    { label: 'CAD' },
    { label: 'KYD' },
    { label: 'CLP' },
    { label: 'CLF' },
    { label: 'CNY' },
    { label: 'COP' },
    { label: 'COU' },
    { label: 'KMF' },
    { label: 'CDF' },
    { label: 'NZD' },
    { label: 'CRC' },
    { label: 'HRK' },
    { label: 'CUP' },
    { label: 'CUC' },
    { label: 'ANG' },
    { label: 'CZK' },
    { label: 'DKK' },
    { label: 'DJF' },
    { label: 'DOP' },
    { label: 'EGP' },
    { label: 'SVC' },
    { label: 'ERN' },
    { label: 'SZL' },
    { label: 'ETB' },
    { label: 'FKP' },
    { label: 'FJD' },
    { label: 'XPF' },
    { label: 'GMD' },
    { label: 'GEL' },
    { label: 'GHS' },
    { label: 'GIP' },
    { label: 'GTQ' },
    { label: 'GBP' },
    { label: 'GNF' },
    { label: 'GYD' },
    { label: 'HTG' },
    { label: 'HNL' },
    { label: 'HKD' },
    { label: 'HUF' },
    { label: 'ISK' },
    { label: 'IDR' },
    { label: 'XDR' },
    { label: 'IRR' },
    { label: 'IQD' },
    { label: 'ILS' },
    { label: 'JMD' },
    { label: 'JPY' },
    { label: 'JOD' },
    { label: 'KZT' },
    { label: 'KES' },
    { label: 'KPW' },
    { label: 'KRW' },
    { label: 'KWD' },
    { label: 'KGS' },
    { label: 'LAK' },
    { label: 'LBP' },
    { label: 'LSL' },
    { label: 'ZAR' },
    { label: 'LRD' },
    { label: 'LYD' },
    { label: 'CHF' },
    { label: 'MOP' },
    { label: 'MKD' },
    { label: 'MGA' },
    { label: 'MWK' },
    { label: 'MYR' },
    { label: 'MVR' },
    { label: 'MRU' },
    { label: 'MUR' },
    { label: 'XUA' },
    { label: 'MXN' },
    { label: 'MXV' },
    { label: 'MDL' },
    { label: 'MNT' },
    { label: 'MAD' },
    { label: 'MZN' },
    { label: 'MMK' },
    { label: 'NAD' },
    { label: 'NPR' },
    { label: 'NIO' },
    { label: 'NGN' },
    { label: 'OMR' },
    { label: 'PKR' },
    { label: 'PAB' },
    { label: 'PGK' },
    { label: 'PYG' },
    { label: 'PEN' },
    { label: 'PHP' },
    { label: 'PLN' },
    { label: 'QAR' },
    { label: 'RON' },
    { label: 'RUB' },
    { label: 'RWF' },
    { label: 'SHP' },
    { label: 'WST' },
    { label: 'STN' },
    { label: 'SAR' },
    { label: 'RSD' },
    { label: 'SCR' },
    { label: 'SLL' },
    { label: 'SGD' },
    { label: 'XSU' },
    { label: 'SBD' },
    { label: 'SOS' },
    { label: 'SSP' },
    { label: 'LKR' },
    { label: 'SDG' },
    { label: 'SRD' },
    { label: 'SEK' },
    { label: 'CHE' },
    { label: 'CHW' },
    { label: 'SYP' },
    { label: 'TWD' },
    { label: 'TJS' },
    { label: 'TZS' },
    { label: 'THB' },
    { label: 'TOP' },
    { label: 'TTD' },
    { label: 'TND' },
    { label: 'TRY' },
    { label: 'TMT' },
    { label: 'UGX' },
    { label: 'UAH' },
    { label: 'AED' },
    { label: 'USN' },
    { label: 'UYU' },
    { label: 'UYI' },
    { label: 'UYW' },
    { label: 'UZS' },
    { label: 'VUV' },
    { label: 'VES' },
    { label: 'VND' },
    { label: 'YER' },
    { label: 'ZMW' },
    { label: 'ZWL' },
    { label: 'XBA' },
    { label: 'XBB' },
    { label: 'XBC' },
    { label: 'XBD' },
    { label: 'XTS' },
    { label: 'XXX' },
    { label: 'XAU' },
    { label: 'XPD' },
    { label: 'XPT' },
    { label: 'XAG' },
    { label: 'AFA' },
    { label: 'FIM' },
    { label: 'ALK' },
    { label: 'ADP' },
    { label: 'ESP' },
    { label: 'FRF' },
    { label: 'AOK' },
    { label: 'AON' },
    { label: 'AOR' },
    { label: 'ARA' },
    { label: 'ARP' },
    { label: 'ARY' },
    { label: 'RUR' },
    { label: 'ATS' },
    { label: 'AYM' },
    { label: 'AZM' },
    { label: 'BYB' },
    { label: 'BYR' },
    { label: 'BEC' },
    { label: 'BEF' },
    { label: 'BEL' },
    { label: 'BOP' },
    { label: 'BAD' },
    { label: 'BRB' },
    { label: 'BRC' },
    { label: 'BRE' },
    { label: 'BRN' },
    { label: 'BRR' },
    { label: 'BGJ' },
    { label: 'BGK' },
    { label: 'BGL' },
    { label: 'BUK' },
    { label: 'HRD' },
    { label: 'CYP' },
    { label: 'CSJ' },
    { label: 'CSK' },
    { label: 'ECS' },
    { label: 'ECV' },
    { label: 'GQE' },
    { label: 'EEK' },
    { label: 'XEU' },
    { label: 'GEK' },
    { label: 'DDM' },
    { label: 'DEM' },
    { label: 'GHC' },
    { label: 'GHP' },
    { label: 'GRD' },
    { label: 'GNE' },
    { label: 'GNS' },
    { label: 'GWE' },
    { label: 'GWP' },
    { label: 'ITL' },
    { label: 'ISJ' },
    { label: 'IEP' },
    { label: 'ILP' },
    { label: 'ILR' },
    { label: 'LAJ' },
    { label: 'LVL' },
    { label: 'LVR' },
    { label: 'LSM' },
    { label: 'ZAL' },
    { label: 'LTL' },
    { label: 'LTT' },
    { label: 'LUC' },
    { label: 'LUF' },
    { label: 'LUL' },
    { label: 'MGF' },
    { label: 'MVQ' },
    { label: 'MLF' },
    { label: 'MTL' },
    { label: 'MTP' },
    { label: 'MRO' },
    { label: 'MXP' },
    { label: 'MZE' },
    { label: 'MZM' },
    { label: 'NLG' },
    { label: 'NIC' },
    { label: 'PEH' },
    { label: 'PEI' },
    { label: 'PES' },
    { label: 'PLZ' },
    { label: 'PTE' },
    { label: 'ROK' },
    { label: 'ROL' },
    { label: 'STD' },
    { label: 'CSD' },
    { label: 'SKK' },
    { label: 'SIT' },
    { label: 'RHD' },
    { label: 'ESA' },
    { label: 'ESB' },
    { label: 'SDD' },
    { label: 'SDP' },
    { label: 'SRG' },
    { label: 'CHC' },
    { label: 'TJR' },
    { label: 'TPE' },
    { label: 'TRL' },
    { label: 'TMM' },
    { label: 'UGS' },
    { label: 'UGW' },
    { label: 'UAK' },
    { label: 'SUR' },
    { label: 'USS' },
    { label: 'UYN' },
    { label: 'UYP' },
    { label: 'VEB' },
    { label: 'VEF' },
    { label: 'VNC' },
    { label: 'YDD' },
    { label: 'YUD' },
    { label: 'YUM' },
    { label: 'YUN' },
    { label: 'ZRN' },
    { label: 'ZRZ' },
    { label: 'ZMK' },
    { label: 'ZWC' },
    { label: 'ZWD' },
    { label: 'ZWN' },
    { label: 'ZWR' },
    { label: 'XFO' },
    { label: 'XRE' },
    { label: 'XFU' }
]
