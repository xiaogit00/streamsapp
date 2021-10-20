import * as React from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function Notification({openState, handleClose, notificationMessage}) {
    console.log('Notification is reached')

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )

    return (
        <div>
            <Snackbar
                open={openState}
                autoHideDuration={6000}
                onClose={handleClose}
                message={notificationMessage}
                action={action}
            />
        </div>
    )
}
