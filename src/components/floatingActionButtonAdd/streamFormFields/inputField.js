import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const InputField = (props) => {
    const { label, name, value, onChange } = props
    return (

        <TextField id="outlined-basic"
            variant="outlined"
            size='small'
            required
            label={label}
            name={name}
            value={value}
            onChange={onChange}

        />

    )
}

export default InputField