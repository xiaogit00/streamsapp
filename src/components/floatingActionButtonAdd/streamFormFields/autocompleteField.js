import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import {useState} from 'react'


export default function AutocompleteField(props) {
    const { options, name, value, label, inputValue, onChange, onInputChange, sx, ref } = props
    return (
        <Autocomplete
            disablePortal
            value={value}
            onChange={onChange}
            inputValue={inputValue}
            onInputChange={onInputChange}
            id="free-solo-demo"
            disableClearable
            options={[value, ...options]}
            sx={sx}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.label}>
                        {option.label}
                    </li>
                )
            }}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            getOptionLabel={option => option.label || ''}
            renderInput={(params) => <TextField {...params} variant="filled" label={label} size="small" />}
        />
    )
}
