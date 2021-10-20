import React from 'react'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import CoinTickerSelectField from 'components/floatingActionButtonAdd/streamFormFields/coinTickerSelectField'
import TickerSelectField from 'components/floatingActionButtonAdd/streamFormFields/tickerSelectField'
import Info from '@mui/icons-material/Info'
import Tooltip from '@mui/material/Tooltip'


const Asset = (props) => {
    const { assetClass, values, handleInputChange, onCoinAssetLeave, displayedTickerMenu, inputValue, onAssetLeave } = props
    if (assetClass==='Crypto') {

        return (
            <>
                <InputField
                    label="Coin"
                    name="asset"
                    value={values.asset}
                    onChange={handleInputChange}
                    required={true}
                    sx={{ m: 0.5, mt: 1, minWidth:130}}
                    onBlur={onCoinAssetLeave}
                    helperText="e.g. BTC/ETH"

                />
                <div style={{display:'flex', alignItems:'center', marginTop:2}}>
                    <CoinTickerSelectField
                        label={<span style={{ fontSize: '0.8em'}}>Ticker (Coingecko)</span>}
                        name='coinId'
                        onChange={handleInputChange}
                        value={values.coinId}
                        menuItems={displayedTickerMenu}
                        sx={{ m: 1, minWidth: 90, mr: 3}}
                        inputValue={inputValue}
                    />
                    <Tooltip title="This app uses CoinGecko to get latest Crypto prices. If this field is not set, then you would not be able to retrieve latest prices for this asset. .">
                        <Info />
                    </Tooltip>
                </div>
            </>
        )
    } else if (assetClass ==='Stocks') {
        return (
            <>
                <InputField
                    label="Asset Name"
                    name="asset"
                    value={values.asset}
                    onChange={handleInputChange}
                    required={true}
                    sx={{ m: 0.5, mt: 1, minWidth:130}}
                    onBlur={onAssetLeave}
                    helperText="e.g. Alphabet/Apple/Microsoft"

                />
                <div style={{display:'flex', alignItems:'center', marginTop:2}}>
                    <TickerSelectField
                        label={<span style={{ fontSize: '0.8em'}}>Ticker</span>}
                        name='ticker'
                        onChange={handleInputChange}
                        value={values.ticker}
                        menuItems={displayedTickerMenu}
                        sx={{ m: 1, minWidth: 90, mr: 3}}
                        inputValue={inputValue}
                    />
                    <Tooltip title="This app uses MarketStack to get latest stock prices. If this field is not set, then you would not be able to retrieve latest prices for this asset. Note: NASDAQ data is retrieved from IEX.">
                        <Info />
                    </Tooltip>
                </div>
            </>
        )
    } else if (assetClass === 'ETF') {
        return (
            <>

                <InputField
                    label="Asset Name"
                    name="asset"
                    value={values.asset}
                    onChange={handleInputChange}
                    required={true}
                    sx={{ m: 0.5, mt: 1, minWidth:130}}
                    onBlur={onAssetLeave}
                    helperText="Search for full name of ETF. e.g. vanguard growth "

                />
                <div style={{display:'flex', alignItems:'center', marginTop:2}}>
                    <TickerSelectField
                        label={<span style={{ fontSize: '0.8em'}}>Ticker (MarketStack)</span>}
                        name='ticker'
                        onChange={handleInputChange}
                        value={values.ticker}
                        menuItems={displayedTickerMenu}
                        sx={{ m: 1, minWidth: 90}}
                        inputValue={inputValue}
                    />
                    <Tooltip title="This app uses MarketStack to get latest ETF prices. If this field is not set, then you would not be able to retrieve latest prices for this asset. If your ETF cannot be found, it is currently not supported.">
                        <Info />
                    </Tooltip>
                </div>
            </>
        )
    } else {
        return null
    }

}

export default Asset
