import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const SelectField = (props) => {

    const { label, onChange, value, name, menuItems } = props
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 110}}>
            <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
            <Select
                label="Asset Class"
                size='small'
                value={value}
                name={name}
                labelId="demo-simple-select-standard-label"
                autoWidth='true'
                id="demo-simple-select-standard"
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {menuItems.map(menuItem =>
                    <MenuItem value={menuItem} key={menuItem}>
                        {menuItem}
                    </MenuItem>)
                }

            </Select>
        </FormControl>
    )
}

export default SelectField
