import React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

export default function BasicDatePicker(props) {
    const { label, name, value, onChange,sx } = props
    // const [value, setValue] = React.useState(null)
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} size="small" variant="filled" sx={sx} />}
            />
        </LocalizationProvider>
    )
}
