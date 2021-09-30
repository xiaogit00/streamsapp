import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const AssetField = () => {
    return (

        <TextField id="outlined-basic"
            label="Asset"
            variant="outlined"
            size='small'
            required
        />

    )
}

export default AssetField
