import React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function AutocompleteField(props) {
    const { options, name, value, label, onChange, sx, ref} = props

    return (
        <Autocomplete
            disablePortal
            onChange={onChange}
            id="free-solo-demo"
            freeSolo
            value={value}
            disableClearable
            options={options}
            sx={sx}
            renderInput={(params) => <TextField {...params} variant="filled" label={<span style={{ fontSize: '0.8em'}}>{label}</span>} size="small" />}
        />
    )
}
