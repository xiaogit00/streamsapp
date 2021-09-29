import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const AssetField = () => {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '24ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic"
                label="Asset"
                variant="outlined"
                size='small'
            />
        </Box>
    )
}

export default AssetField
