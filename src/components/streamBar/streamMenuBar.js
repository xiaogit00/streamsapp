import React from 'react'
import IconButton from '@mui/material/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStream } from 'reducers/streamReducer'
import streamServices from 'services/streams'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'


const options = [
    'Edit',
    'Delete'
]

const ITEM_HEIGHT = 48

function StreamMenuBar({id}) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const streamData = useSelector(state => state.streams).find(stream => stream.id === id)
    const editStreamState = useSelector(state => state.modals).editStreamModalOpen

    const handleClose = (event) => {
        const action = event.target.textContent
        if (action === 'Edit') {
            dispatch({type: 'TOGGLE_EDIT_STREAM', id:id})
        } else if (action === 'Delete') {
            if (confirm('Are you sure you want to delete this stream?')) {
                dispatch(deleteStream(id))
            }
        }
        setAnchorEl(null)
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                size="small"
                sx={{position:'absolute', left:'21.5%', marginTop:'2px'}}
            >
                <MoreVertIcon />
            </IconButton>
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

export default StreamMenuBar
