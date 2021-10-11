import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newStream } from 'reducers/streamReducer'
import { Form, HeaderText, ModalBody, ModalFooter, initialFValues,
    streamAssetClassMenu } from 'components/floatingActionButtonAdd/streamModalFormHelper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import SelectField from 'components/floatingActionButtonAdd/streamFormFields/selectField'
import MultiSelectField from 'components/floatingActionButtonAdd/streamFormFields/multiSelectField'
import MultiSelectSwaps from 'components/floatingActionButtonAdd/streamFormFields/multiSelectSwaps'
import RadioButton from 'components/floatingActionButtonAdd/streamFormFields/radioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'



const StreamModalForm = () => {
//**********************************************************
//*                     Definitions
//**********************************************************
    const [values, setValues] = useState(initialFValues)
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
        setValues({
            ...values,
            [name]:value
        })

    }

    const handleChipInputChange = e => {
        const { name, value } = e.target
        const tradeIDs = value.map(item => item.id)
        setValues({
            ...values,
            trades:tradeIDs
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
        dispatch(newStream(values))
    }

    //**********************************************************
    //*                    JSX
    //**********************************************************
    return (
        <>
            <Form onSubmit={submitHandler} >
                <ModalBody>
                    <HeaderText>Create a Stream</HeaderText>
                    <InputField
                        label="Asset"
                        name="asset"
                        value={values.asset}
                        onChange={handleInputChange}
                        required={true}
                        sx={{ m: 0.5, minWidth:235}}
                    />
                    <SelectField
                        label="Asset Class"
                        name='assetClass'
                        onChange={handleInputChange}
                        value={values.assetClass}
                        menuItems={streamAssetClassMenu}
                        sx={{ m: 1, minWidth: 110}}
                    />
                    <MultiSelectField
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
                    />)}

                </ModalBody>
                <ModalFooter>
                    <CancelButton action="TOGGLE_STREAM"></CancelButton>
                    <CreateButton></CreateButton>
                </ModalFooter>
            </Form>
        </>
    )
}

export default StreamModalForm
