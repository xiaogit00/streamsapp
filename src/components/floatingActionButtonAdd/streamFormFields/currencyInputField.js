
import * as React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                })
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    )
})

NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default function CurrencyField(props) {
    const { onChange, value, name, label, sx } = props

    return (

        <TextField
            label={label}
            value={value}
            onChange={onChange}
            name={name}
            id="formatted-numberformat-input"
            InputProps={{
                inputComponent: NumberFormatCustom,
            }}
            variant="outlined"
            size="small"
            sx={sx}
        />
    )
}
