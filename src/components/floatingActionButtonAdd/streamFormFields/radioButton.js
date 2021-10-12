import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'



export default function RadioButton(props) {
    const { label, name, value, onChange, button1Label, button2Label, sx} = props
    return (
        <FormControl component="fieldset" sx={sx}>
            <FormLabel sx={{fontSize:'0.9'}} component="legend">{label}</FormLabel>
            <RadioGroup row aria-label={label} name={name} onChange={onChange} value={value}>
                <FormControlLabel value={true} control={<Radio />} label={<span style={{ fontSize: '0.8em' }}>{button1Label}</span>} />
                <FormControlLabel value={false} control={<Radio />} label={<span style={{ fontSize: '0.8em' }}>{button2Label}</span>} />

            </RadioGroup>
        </FormControl>
    )
}
