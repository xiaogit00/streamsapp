import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export default function CreateButton({label}) {
    return (
        <Button variant="contained"
            sx={{backgroundColor: '#460F61',
                color: 'white',
                '&:hover': {
                    backgroundColor: '#7E2C65'
                }

            }}
            type="submit"
        >{label}</Button>
    )
}

//4F2EED
