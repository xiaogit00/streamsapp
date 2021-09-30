import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useDispatch } from 'react-redux'

export default function CancelButton({ action }) {

    const dispatch = useDispatch()
    return (
        <Button variant="contained"
            sx={{backgroundColor: 'white',
                color: '#5E5E5E',
                '&:hover': {
                    backgroundColor: '#EDEEEF'
                }

            }}
            onClick={() => dispatch({type: action})}
        >
            Cancel
        </Button>
    )
}

//4F2EED
