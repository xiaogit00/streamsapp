import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function CancelButton() {
    return (
        <Button variant="contained"
            sx={{backgroundColor: 'white',
                color: '#5E5E5E',
                '&:hover': {
                    backgroundColor: '#EDEEEF'
                }

            }}>Cancel</Button>
    )
}

//4F2EED
