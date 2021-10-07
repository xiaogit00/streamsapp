import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import SelectField from 'components/floatingActionButtonAdd/streamFormFields/selectField'
import MultiSelectField from 'components/floatingActionButtonAdd/streamFormFields/multiSelectField'
import RadioButton from 'components/floatingActionButtonAdd/streamFormFields/radioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'

const Form = styled.form`
    height: 69vh;
`

const HeaderText = styled.p`
    font-family: Calibri, sans-serif;
    font-size: 1.3em;
    /* border: 1px solid grey; */
    margin-left: 0.2em;
    color: #5E5E5E;

`
const ModalBody = styled.div`
    /* border: 0.5px solid green; */
    height: 87%;
    display: flex;
    padding-left: 2em;
    padding-right: 2em;
    flex-direction: column;
    align-items: flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    overflow:auto;
`

const ModalFooter = styled.div`
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
const initialFValues = {
    asset:'',
    assetClass:'',
    trades: [],
    hasSwaps: false,
    swaps: []
}
const StreamModalForm = () => {
    const [values, setValues] = useState(initialFValues)
    const [selectedChips, setSelectedChips] = React.useState([])
    const [chipName, setChipName] = React.useState([])
    const trades = useSelector(state => state.trades)
    const streamTradeMenuItems = trades.filter(trade => trade.assigned === false)


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
        console.log('value,',value)
        setValues({
            ...values,
            [name]:value
        })
        setSelectedChips(value)
        setChipName(value)
    }
    const handleChipDelete = chipToDelete => () => {
        // console.log('selectedChips',selectedChips)
        let s = selectedChips.filter(chip => chip.asset !== chipToDelete.asset)
        console.log('s',s)
        setSelectedChips(s)
        setChipName(s)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        // console.log('values in form:',values)
    }



    const streamAssetClassMenu = [
        'Crypto',
        'Stocks',
        'ETF'
    ]


    const swapsMenuItems = [
        'Swap 1',
        'Swap 2',
        'Swap 3',
        'Swap 4',
        'Swap 5'
    ]

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
                    {values.hasSwaps === 'true' && (<MultiSelectField
                        value={values.swaps}
                        name='swaps'
                        onChange={handleInputChange}
                        label="Swaps"
                        menuItems={swapsMenuItems}
                        sx={{ m: 0.5, mt:2, mb:8, width: 235 }}
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
