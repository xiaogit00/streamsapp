import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import SelectField from 'components/floatingActionButtonAdd/streamFormFields/selectField'
import MultiSelectField from 'components/floatingActionButtonAdd/streamFormFields/multiSelectField'
import RadioButton from 'components/floatingActionButtonAdd/streamFormFields/radioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'
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

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log(typeof value)
        setValues({
            ...values,
            [name]:value
        })
    }


    const streamAssetClassMenu = [
        'Crypto',
        'Stocks',
        'ETF'
    ]

    const streamTradeMenuItems = [
        'Trade 1',
        'Trade 2',
        'Trade 3',
        'Trade 4',
        'Trade 5'
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
                    onChange={handleInputChange}
                    name="trades"
                    value={values.trades}
                    menuItems={streamTradeMenuItems}
                    sx={{ m: 0.5, mt:2, width: 235 }}
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
        </>
    )
}

export default StreamModalForm
