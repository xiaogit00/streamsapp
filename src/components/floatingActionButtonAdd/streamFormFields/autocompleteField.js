import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import {useState} from 'react'


export default function AutocompleteField(props) {
    const { options, name, value, label, inputValue, onChange, onInputChange, sx, ref } = props
    return (
        <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            onChange={onChange}
            options={options}
            sx={sx}
            renderInput={(params) => <TextField {...params} variant="filled" label={label} size="small" />}
        />

    )
}
