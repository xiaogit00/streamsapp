import * as React from 'react'
import Box from '@mui/material/Box'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import EditIcon from '@material-ui/icons/Edit'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'
import WavesIcon from '@material-ui/icons/Waves'
import MobileFriendlyIcon from '@material-ui/icons/MobileFriendly'
import CreateIcon from '@mui/icons-material/Create'
// import AssignmentIcon from '@material-ui/icons/AssignmentIcon'
import AddchartIcon from '@mui/icons-material/Addchart'
import { makeStyles } from '@material-ui/core'
import ModalUnstyledDemo from 'components/floatingActionButtonAdd/addStreamModal'



const actions = [
    { icon: <CreateIcon />, name: 'Add Order' },
    { icon: <AddchartIcon />, name: 'Add Trade' },
    { icon: <WavesIcon />, name: 'Add Stream' }
]

// const useStyles = makeStyles({
//     root: {
//         '& .MuiButtonBase-root': {
//             backgroundColor: 'black'
//         },
//     },
//     selected: {} //Here, selected uses a jss-nested plugin to reference a local rule
// })

export default function BasicSpeedDial() {
    // const classes = useStyles()
    const handleClick = () => {
        console.log('clicked')
    }
    return (
        <Box sx={{ height: '90%',
            transform: 'translateZ(0px)',
            flexGrow: 1}}>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                sx={{ position: 'absolute', bottom: 14, left: 60,
                    '& .MuiFab-primary': {
                        backgroundColor: '#460F61',
                        '&:hover': {
                            backgroundColor: '#4E116D'
                        },
                        border: '1px solid blue'
                    }
                }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                /*classes={{
                    root:classes.root,
                    selected: classes.selected

                }}*/
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClick}
                    />
                ))}
            </SpeedDial>
        </Box>
    )
}
