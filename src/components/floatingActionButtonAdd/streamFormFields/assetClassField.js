import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const AssetClassField = () => {
    const [assetClass, setAssetClass] = React.useState('')

    const handleChange = (event) => {
        setAssetClass(event.target.value)
    }
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 110}}>
            <InputLabel id="demo-simple-select-standard-label">Asset Class</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                autoWidth='true'
                id="demo-simple-select-standard"
                onChange={handleChange}
                label="Asset Class"
                size='small'
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Crypto</MenuItem>
                <MenuItem value={20}>Stocks</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export default AssetClassField
