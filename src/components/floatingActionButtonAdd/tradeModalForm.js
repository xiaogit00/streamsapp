import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputField from 'components/floatingActionButtonAdd/streamFormFields/inputField'
import SelectField from 'components/floatingActionButtonAdd/streamFormFields/selectField'
import MultiSelectField from 'components/floatingActionButtonAdd/streamFormFields/multiSelectField'
import AutocompleteField from 'components/floatingActionButtonAdd/streamFormFields/autocompleteField'
import BasicDatePicker from 'components/floatingActionButtonAdd/streamFormFields/basicDatePicker'
import CurrencyField from 'components/floatingActionButtonAdd/streamFormFields/currencyInputField'
import RadioButton from 'components/floatingActionButtonAdd/streamFormFields/radioButton'
import SwapsField from 'components/floatingActionButtonAdd/streamFormFields/swapsField'
import CancelButton from 'components/floatingActionButtonAdd/streamFormFields/cancelButton'
import CreateButton from 'components/floatingActionButtonAdd/streamFormFields/createButton'

const HeaderText = styled.p`
    font-family: Calibri, sans-serif;
    font-size: 1.3em;
    font-weight: lighter;
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
    date: {},
    asset: '',
    isSwap: 'false',
    orderType: '',
    platform: '',
    position: 'open',
    price: 0,
    priceDenom:'',
    amt:0,
    value: 0,
    valueDenom:'',
    fees: 0,
    feesDenom: 0,
    comments:''

}
const TradeModalForm = () => {
    const [values, setValues] = useState(initialFValues)

    const handleInputChange = e => {
        console.log('e', e)
        const { name, value } = e.target
        console.log(typeof parseInt(value))
        setValues({
            ...values,
            [name]: value
        })
    }
    const handleDateChange = e => {
        if (e) {
            setValues({
                ...values,
                date: e
            })
        } else {
            setValues({
                ...values,
                date: {}
            })
        }

    }

    const handleCurrencyChange = (e, value) => {
        const { name } = e.target
        setValues({
            ...values,
            [name]: parseInt(value)
        })
    }

    const currencies = [
        { label: 'SGD' },
        { label: 'USD' },
        { label: 'CNY' },
        { label: 'GBP' }
    ]

    const orderTypeMenuItems = [
        'Limit Buy',
        'Limit Sell',
        'Market Buy',
        'Market Sell',
        'Swap',
        'Stop Loss',
        'Take Profit'
    ]


    return (
        <>
            <ModalBody>
                <HeaderText>Create a Trade</HeaderText>
                <BasicDatePicker
                    label="Date of trade"
                    name="date"
                    value={values.date}
                    onChange={handleDateChange}
                />
                <InputField
                    label="Asset"
                    name="asset"
                    value={values.asset}
                    onChange={handleInputChange}
                    required={true}
                />
                <RadioButton
                    label="Is swap?"
                    name="hasSwaps"
                    value={values.hasSwaps}
                    onChange={handleInputChange}
                    button1Label="Yes"
                    button2Label="No"
                />
                <SelectField
                    label="Order Type"
                    name='orderType'
                    onChange={handleInputChange}
                    value={values.orderTyle}
                    menuItems={orderTypeMenuItems}
                />
                <InputField
                    label="Platform"
                    name="platform"
                    value={values.platform}
                    onChange={handleInputChange}
                    required={false}
                />
                <RadioButton
                    label="Position"
                    name="position"
                    value={values.hasSwaps}
                    onChange={handleInputChange}
                    button1Label="Open"
                    button2Label="Closed"
                />
                <CurrencyField
                    label="Price"
                    value={values.price}
                    name="price"
                    onChange={handleInputChange}
                />
                <AutocompleteField
                    options={currencies}
                    label="Denom"
                    name="priceDenom"
                    value={values.priceDenom}
                    onChange={handleInputChange}
                />
                <CurrencyField
                    label="Amount"
                    value={values.amt}
                    name="amt"
                    onChange={handleInputChange}
                />
                <CurrencyField
                    label="Fees"
                    value={values.fees}
                    name="fees"
                    onChange={handleInputChange}
                />
                <AutocompleteField
                    options={currencies}
                    label="Denom"
                    name="feesDenom"
                    value={values.feesDenom}
                    onChange={handleInputChange}
                />


            </ModalBody>
            <ModalFooter>
                <CancelButton action="TOGGLE_TRADE"></CancelButton>
                <CreateButton></CreateButton>
            </ModalFooter>
        </>
    )
}

export default TradeModalForm
