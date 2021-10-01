import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function AutocompleteField(props) {
    const { options, name, value, label, onChange } = props
    return (
        <Autocomplete
            disablePortal
            onChange={onChange}
            id="free-solo-demo"
            freeSolo
            disableClearable
            options={options}
            sx={{ width: 100 }}
            renderInput={(params) => <TextField {...params} name={name} label={label} size='small' value={value}/>}
        />
    )
}
