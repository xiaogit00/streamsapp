import * as React from 'react'
import { useState, useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'

const CoinTickerSelectField = (props) => {

    const { label, onChange, value, name, menuItems, sx } = props
    // const [displayedValue, setDisplayedValue] = useState('')
    // useEffect(() => {
    //     menuItems.then(result => setDisplayedValue(result))
    // }, [displayedValue])
    // console.log('displayedValue',displayedValue)
    // let displayedValue = async () => {
    //     return await menuItems
    // }
    // console.log(displayedValue())


    return (
        <FormControl variant="standard" sx={sx}>
            <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
            <Select
                label="Asset Class"
                size='small'
                value={value}
                name={name}
                labelId="demo-simple-select-standard-label"
                autoWidth={true}
                id="demo-simple-select-standard"
                onChange={onChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {console.log('menuItems from within coinTicker', menuItems)}
                {menuItems && menuItems.map(menuItem =>
                    <MenuItem value={menuItem.id} key={menuItem.id}>
                        <span style={{ fontSize: '0.9em'}}>{menuItem.symbol.toUpperCase()} ({menuItem.id.toUpperCase()})</span>
                    </MenuItem>)
                }

            </Select>
            <FormHelperText>Select from the tickers above.</FormHelperText>
        </FormControl>
    )
}

export default CoinTickerSelectField