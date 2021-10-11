import styled from 'styled-components'
import * as React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { newTrade } from 'reducers/tradeReducer'
import { Form, HeaderText, ModalBody, ModalFooter, initialFValues,
    currencies, orderTypeMenuItems } from 'components/floatingActionButtonAdd/tradeModalFormHelper'
    //A lot of variables used in this component are loaded via the tradeModalFormHelper
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


const TradeModalForm = () => {
    const [values, setValues] = useState(initialFValues)
    const dispatch = useDispatch()

    //**********************************************************
    //*                     HANDLERS
    //**********************************************************
    const handleInputChange = e => {
        const { name, value } = e.target
        if (name === 'price') {
            const valueField = value * values.amt
            setValues({
                ...values,
                [name]: value,
                value: valueField
            })
        } else if ( name === 'amt') {
            const valueField = values.price * value
            setValues({
                ...values,
                [name]: value,
                value: valueField
            })
        } else {
            setValues({
                ...values,
                [name]: value
            })
        }
    }

    const handlePriceDenomChange = e => {
        const { name, textContent } = e.target
        setValues({
            ...values,
            priceDenom: textContent,
            valueDenom: textContent
        })
    }

    const handleFeesDenomChange = e => {

        const { name, textContent } = e.target
        setValues({
            ...values,
            feesDenom: textContent
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

    const submitHandler = (event) => {
        event.preventDefault()
        console.log('values:',values)
        dispatch(newTrade(values))
    }


    return (
        <>
            <Form onSubmit={submitHandler} >
                <ModalBody>
                    <HeaderText>Create a Trade</HeaderText>
                    <BasicDatePicker
                        label="Date of trade"
                        name="date"
                        value={values.date}
                        onChange={handleDateChange}
                        sx={{m:0.5, width:150}}
                    />
                    <InputField
                        label="Asset"
                        name="asset"
                        value={values.asset}
                        onChange={handleInputChange}
                        required={true}
                        sx={{ m: 0.5, mt: 1, minWidth:235}}

                    />

                    <div style={{display:'flex', alignItems:'center', marginTop:2}}>
                        <CurrencyField
                            label="Price"
                            value={values.price}
                            name="price"
                            onChange={handleInputChange}
                            sx={{m:1,ml:0.5, width:130}}
                        />
                        <AutocompleteField
                            options={currencies}
                            label="Denom"
                            name="priceDenom"
                            value={values.priceDenom}
                            onChange={handlePriceDenomChange}
                            sx={{ width: 80, ml:2 }}
                        />
                    </div>
                    <div style={{display:'flex', width: '100%', alignItems:'center',justifyContent:'space-between'}}>
                        <InputField
                            label="Amount"
                            value={values.amt}
                            name="amt"
                            onChange={handleInputChange}
                            required={false}
                            sx={{ m: 0.5, mb:0, width:100}}
                        />
                        <TextField
                            disabled
                            label={'Trade Value'}
                            name="value"
                            variant="standard"
                            value={values.value}
                            size="small"
                            sx={{ width: 90, ml:4 }}
                        />
                        <span style={{alignSelf:'flex-end', fontFamily:'Calibri, sans-serif', fontSize:'0.7em'}}>{values.priceDenom}</span>

                    </div>
                    <RadioButton
                        label="Is swap?"
                        name="isSwap"
                        value={values.isSwap}
                        onChange={handleInputChange}
                        button1Label="Yes"
                        button2Label="No"
                        sx={{m:1}}
                    />
                    <InputField
                        label="Platform"
                        name="platform"
                        value={values.platform}
                        onChange={handleInputChange}
                        required={false}
                        sx={{ m: 0.5, mb:0, minWidth:235}}
                    />

                    <SelectField
                        label="Order Type"
                        name='orderType'
                        onChange={handleInputChange}
                        value={values.orderType}
                        menuItems={orderTypeMenuItems}
                        sx={{ m: 1, mt:0.5,minWidth: 110}}
                    />


                    <div style={{display:'flex', alignItems:'center'}}>
                        <CurrencyField
                            label="Fees"
                            value={values.fees}
                            name="fees"
                            onChange={handleInputChange}
                            sx={{m:1,ml:0.5, mt:2, width:80}}
                        />
                        <AutocompleteField
                            options={currencies}
                            label="Denom"
                            name="feesDenom"
                            value={values.feesDenom}
                            onChange={handleFeesDenomChange}
                            sx={{ width: 80, ml:8}}
                        />
                    </div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Comments"
                        multiline
                        variant='outlined'
                        rows={3}
                        sx={{m:0.5, mt:2, width: 235}}
                    />


                </ModalBody>
                <ModalFooter>
                    <CancelButton action="TOGGLE_TRADE"></CancelButton>
                    <CreateButton></CreateButton>
                </ModalFooter>
            </Form>
        </>

    )
}

export default TradeModalForm
