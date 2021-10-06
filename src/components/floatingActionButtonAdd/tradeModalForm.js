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
    /* font-weight: lighter; */
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
    price: '',
    priceDenom:'',
    amt:'',
    value: '',
    valueDenom:'',
    fees: '',
    feesDenom: '',
    comments:''

}
const TradeModalForm = () => {
    const [values, setValues] = useState(initialFValues)

    const handleInputChange = e => {
        console.log('e', e)
        const { name, value } = e.target
        console.log(value)
        setValues({
            ...values,
            [name]: value
        })
    }

    const handlePriceDenomChange = e => {
        console.log('e', e)
        const { name, textContent } = e.target
        console.log('value',textContent)
        setValues({
            ...values,
            priceDenom: textContent
        })
    }

    const handleFeesDenomChange = e => {
        console.log('e', e)
        const { name, textContent } = e.target
        console.log('value',textContent)
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
                <InputField
                    label="Asset"
                    name="asset"
                    value={values.asset}
                    onChange={handleInputChange}
                    required={true}
                    sx={{ m: 0.5, minWidth:235}}

                />
                <BasicDatePicker
                    label="Date of trade"
                    name="date"
                    value={values.date}
                    onChange={handleDateChange}
                    sx={{m:0.5, mt:1, minWidth:235}}
                />
                <RadioButton
                    label="Is swap?"
                    name="hasSwaps"
                    value={values.hasSwaps}
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
                        label={'Value '}
                        name="value"
                        variant="standard"
                        value={'$'+Math.round(values.amt*values.price * 100) / 100}
                        size="small"
                        sx={{ width: 90, ml:4 }}
                    />
                    <span style={{alignSelf:'flex-end', fontFamily:'Calibri, sans-serif', fontSize:'0.7em'}}>{values.priceDenom}</span>

                </div>
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


            </ModalBody>
            <ModalFooter>
                <CancelButton action="TOGGLE_TRADE"></CancelButton>
                <CreateButton></CreateButton>
            </ModalFooter>
        </>
    )
}

export default TradeModalForm

// <div style={{marginRight:43}}>
//     <span style={{fontSize:'0.8em',fontFamily:'Calibri, sans-serif'}}>Value:</span>
//     <span>3213</span>
// </div>
