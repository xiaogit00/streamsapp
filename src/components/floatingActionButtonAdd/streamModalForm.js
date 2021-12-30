import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newStream } from 'reducers/streamReducer'
import { updateTrade } from 'reducers/tradeReducer'
import { Form, HeaderText, ModalBody, ModalFooter, initialFValues,
    streamAssetClassMenu } from 'components/floatingActionButtonAdd/streamModalFormHelper'
import { tickerMenuItems, coinMenuItems } from 'components/floatingActionButtonAdd/tradeModalFormHelper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import Asset from 'components/floatingActionButtonAdd/streamFormFields/asset'
import SelectField from 'components/floatingActionButtonAdd/streamFormFields/selectField'
import MultiSelectField from 'components/floatingActionButtonAdd/streamFormFields/multiSelectField'
import MultiSelectSwaps from 'components/floatingActionButtonAdd/streamFormFields/multiSelectSwaps'
import RadioButton from 'components/floatingActionButtonAdd/streamFormFields/radioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'




const StreamModalForm = ({notifHandler}) => {
//**********************************************************
//*                     Definitions
//**********************************************************
    const [values, setValues] = useState(initialFValues)
    const [displayedTickerMenu, setDisplayedTickerMenu] = useState(null)
    const [inputValue, setInputValue] = useState('')
    //For Trades
    const [selectedChips, setSelectedChips] = React.useState([])
    const [chipName, setChipName] = React.useState([])
    //For Swaps
    const [selectedSwapChips, setSelectedSwapChips] = React.useState([])
    const [swapChipName, setSwapChipName] = React.useState([])
    //Setting Menu Items
    const trades = useSelector(state => state.trades)
    const streamTradeMenuItems = trades.filter(trade => trade.assigned === false && !trade.isSwap)
    const swapsMenuItems = trades.filter(trade => trade.assigned === false && trade.isSwap === true)

    const dispatch = useDispatch()
    //**********************************************************
    //*                     HANDLERS
    //**********************************************************
    const handleInputChange = e => {
        const { name, value } = e.target
        // console.log('e.target:', e.target)
        if (name ==='assetClass') {
            setDisplayedTickerMenu(null)
            setValues({
                ...values,
                [name]: value,
                asset: ''
            })
        } else {
            setValues({
                ...values,
                [name]:value
            })
        }



    }

    const handleChipInputChange = e => {
        const { name, value } = e.target
        console.log('Value of chip: ', value)
        const tradeIDs = value.map(item => item.id)
        setValues({
            ...values,
            trades:tradeIDs,
            exchangePriceDenom: value[0].priceDenom
        })
        setSelectedChips(value)
        setChipName(value)

    }

    const handleSwapChipInputChange = e => {
        const { name, value } = e.target
        const swapIDs = value.map(item => item.id)

        const uniqueAssets = [...new Set(value.map(trade => trade.asset))]
        let swapObjects = [] //an array. I need to populate it with {}\

        uniqueAssets.map(asset => { //for each asset.
            let swapObject = {
                asset: asset,
                trades: []
            }
            trades.map(trade => {
                if (trade.asset === asset) {
                    swapObject.trades.push(trade.id)
                }
            })
            swapObjects.push(swapObject)
        }

        )
        setValues({
            ...values,
            swaps: swapObjects
        })
        setSelectedSwapChips(value)
        setSwapChipName(value)
    }

    const handleChipDelete = chipToDelete => () => {
        // console.log('selectedChips',selectedChips)
        let s = selectedChips.filter(chip => chip.id !== chipToDelete.id)
        console.log('s',s)
        const tradesID = s.map(trade => trade.id)
        setValues({
            ...values,
            trades: tradesID
        })
        setSelectedChips(s)
        setChipName(s)

    }
    console.log('This is reached again')
    const handleSwapChipDelete = chipToDelete => () => {
        // console.log('selectedSwapChips',selectedSwapChips)
        let s = selectedSwapChips.filter(chip => chip.id !== chipToDelete.id)
        console.log('s',s)
        const swapsID = s.map(swap => swap.id)
        setValues({
            ...values,
            swaps: swapsID
        })
        setSelectedSwapChips(s)
        setSwapChipName(s)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log('values', values)
        dispatch(newStream(values))
        if (values.trades.length > 0) {
            console.log('if statement of submit handler is reached')
            values.trades.map(tradeId => {
                const tradeObject = trades.filter(trade => trade.id === tradeId)[0]
                //This is the problematic line. I'll need to see what tradeObject returns
                //I think I found the problem. tradeObject is not an array. it returns an array.
                //That's right. The fix
                console.log('tradeObject: ', tradeObject)
                dispatch(updateTrade(tradeId, {...tradeObject, assigned:true}))
            })
        }
        dispatch({type: 'TOGGLE_STREAM'})
        notifHandler(values.asset)
    }

    //ASSET HANDLERS
    const onAssetLeave = async (event) => {
        console.log('assetleave is triggered')
        const data = await tickerMenuItems(values.asset)
        //this will be set to the list of objects returned
        console.log('ticker data is fetched from server')
        setDisplayedTickerMenu(data)
    }

    const onCoinAssetLeave = async (event) => {
        const data = await coinMenuItems(values.asset.toLowerCase())
        //this will be set to the list of objects returned
        console.log('ticker data is fetched from server', data)
        setDisplayedTickerMenu(data)
    }

    //**********************************************************
    //*                    JSX
    //**********************************************************
    return (
        <>
            <Form onSubmit={submitHandler} >
                <ModalBody>
                    <HeaderText>Create a Stream</HeaderText>
                    <SelectField
                        label="Asset Class"
                        name='assetClass'
                        onChange={handleInputChange}
                        value={values.assetClass}
                        menuItems={streamAssetClassMenu}
                        sx={{ m: 1, minWidth: 110}}
                    />

                    <Asset assetClass={values.assetClass}
                        values={values}
                        handleInputChange={handleInputChange}
                        onAssetLeave={onAssetLeave}
                        onCoinAssetLeave={onCoinAssetLeave}
                        displayedTickerMenu={displayedTickerMenu}
                        inputValue={inputValue}
                    />


                    {values.assetClass!=='' && (<><MultiSelectField
                        label="Trades"
                        onChange={handleChipInputChange}
                        name="trades"
                        value={chipName}
                        menuItems={streamTradeMenuItems}
                        sx={{ m: 0.5, mt:2, width: 235 }}
                        handleDelete={handleChipDelete}
                        selectedChips={selectedChips}
                    />

                    <RadioButton
                        label="Contains Swaps?"
                        name="hasSwaps"
                        value={values.hasSwaps}
                        onChange={handleInputChange}
                        button1Label="Yes"
                        button2Label="No"
                    />
                    {values.hasSwaps === 'true' && (<MultiSelectSwaps
                        value={swapChipName}
                        name='swaps'
                        onChange={handleSwapChipInputChange}
                        label="Swaps"
                        menuItems={swapsMenuItems}
                        sx={{ m: 0.5, mt:2, mb:8, width: 235 }}
                        handleDelete={handleSwapChipDelete}
                        selectedChips={selectedSwapChips}
                    />)}</>)}

                </ModalBody>
                <ModalFooter>
                    <CancelButton action="TOGGLE_STREAM"></CancelButton>
                    <CreateButton label="CREATE"></CreateButton>
                </ModalFooter>
            </Form>
        </>
    )
}

export default StreamModalForm
