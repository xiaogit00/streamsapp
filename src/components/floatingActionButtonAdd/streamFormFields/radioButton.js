import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function RadioButton(props) {
    const { label, name, value, onChange} = props
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup row aria-label={label} name={name} onChange={onChange}>
                <FormControlLabel value={true} control={<Radio />} label="yes" />
                <FormControlLabel value={false} control={<Radio />} label="no" />

            </RadioGroup>
        </FormControl>
    )
}