import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

export default function SwapsRadioButton() {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Contains Swaps?</FormLabel>
            <RadioGroup row aria-label="containsSwaps" name="row-radio-buttons-group">
                <FormControlLabel value="yes" control={<Radio />} label="yes" />
                <FormControlLabel value="n0" control={<Radio />} label="no" />

            </RadioGroup>
        </FormControl>
    )
}
