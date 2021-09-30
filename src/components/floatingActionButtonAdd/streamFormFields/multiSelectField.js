import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 10
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 200,
        },
    },
}



function getStyles(name, personName, theme) {
    return {
        fontWeight:
      personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    }
}

const MultiSelectField = (props) => {
    const { value, name, onChange, label, menuItems} = props
    const theme = useTheme()
    // const [personName, setPersonName] = React.useState([])
    //
    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event
    //     setPersonName(
    //         // On autofill we get a the stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     )
    // }


    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    size='small'
                    value={value}
                    onChange={onChange}
                    name={name}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {menuItems.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, value, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default MultiSelectField
