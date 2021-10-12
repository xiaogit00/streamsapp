import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { newStream, updateStream } from 'reducers/streamReducer'
import { Form, HeaderText, ModalBody, ModalFooter,
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



const EditStreamModalForm = ({ id }) => {
//**********************************************************
//*                     Definitions
//**********************************************************
    const streams = useSelector(state => state.streams) //all the streams
    const targetStreamId = useSelector(state => state.modals).editStreamModalOpen.targettedStream //gets the streamID in question

    const currentStream = streams.find(stream => stream.id === targetStreamId) //uses the streamID to return stream object
    currentStream.swaps.length > 0 ? currentStream.hasSwaps = 'true' : currentStream.hasSwaps = 'false' //adds hasSwaps field to stream object
    const [values, setValues] = useState(currentStream)
    //For Trades
    const trades = useSelector(state => state.trades)
    const tradesInStream = trades.filter(trade => currentStream.trades.includes(trade.id))
    const [selectedChips, setSelectedChips] = React.useState(tradesInStream)
    const [chipName, setChipName] = React.useState(tradesInStream)

    //For Swaps
    //Okay my swaps field is a bit more complex. currentStream.swaps is an array. To get all the trades in the object, we'll need to
    //Loop through the array, and
    let swapsInStream = []
    currentStream.swaps.map(swap => swapsInStream.push(...swap.trades))
    const swapObjectsInStream = trades.filter(trade => swapsInStream.includes(trade.id))
    console.log('swapObjectsInStream',swapObjectsInStream)
    const [selectedSwapChips, setSelectedSwapChips] = React.useState(swapObjectsInStream)
    const [swapChipName, setSwapChipName] = React.useState(swapObjectsInStream)

    //Setting Menu Items
    //Now there is a problem cos currentStream.trades returns the trade IDs - but I would need to be sending the trade objects into
    //multiSelectField for it to work.
    //Write a new variable that returns the objects based on tradeIDs.

    const streamTradeMenuItems = tradesInStream.concat(trades.filter(trade => trade.assigned === false && !trade.isSwap)) //This returns an array of unassigned trades.
    //^This above basically returns an array of trade objects that is based on 1) what is in currentStream, and 2) the trades that are unassigned
    const swapsMenuItems = swapObjectsInStream.concat(trades.filter(trade => trade.assigned === false && trade.isSwap === true))

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
        // console.log('FINAL VALUE id', values)
        dispatch(updateStream(values.id, values))
        dispatch({type:'TOGGLE_EDIT_STREAM'})
    }

    //**********************************************************
    //*                    JSX
    //**********************************************************
    return (
        <>
            <Form onSubmit={submitHandler} >
                <ModalBody>
                    <HeaderText>Update {values.asset} stream</HeaderText>
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
                    {console.log('VALUES of HASSWAPS',values.hasSwaps)}
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
                    <CancelButton action="TOGGLE_EDIT_STREAM"></CancelButton>
                    <CreateButton label="UPDATE"></CreateButton>
                </ModalFooter>
            </Form>
        </>
    )
}

export default EditStreamModalForm
