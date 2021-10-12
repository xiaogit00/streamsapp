import React from 'react'
import IconButton from '@mui/material/IconButton'
import { useDispatch } from 'react-redux'
import { deleteTrade } from 'reducers/tradeReducer'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const options = [
    'Edit',
    'Delete'
]

const ITEM_HEIGHT = 48

function TradeMenuBar({id, handleTradeEdit }) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (event) => {
        const action = event.target.textContent
        if (action === 'Edit') {
            handleTradeEdit(id)
        } else if (action === 'Delete') {
            if (confirm('Are you sure you want to delete this trade?')) {
                dispatch(deleteTrade(id))

            }
        }
        setAnchorEl(null)
    }

    return (
        <div style={{position:'relative'}}>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                sx={{zIndex:5}}
            >
                <MoreVertIcon />
            </IconButton>
            {console.log('anchorEl',anchorEl)}
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default TradeMenuBar
