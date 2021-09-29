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

import { styled } from '@mui/system'
import ModalUnstyled from '@mui/core/ModalUnstyled'
import Modal from 'components/floatingActionButtonAdd/modal'
import { useDispatch } from 'react-redux'
//**********************************************
//*             Modals Styles
//**********************************************

// const StyledModal = styled(ModalUnstyled)`
//   position: fixed;
//   z-index: 1300;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `
//
// const Backdrop = styled('div')`
//   z-index: -1;
//   position: fixed;
//   right: 0;
//   bottom: 0;
//   top: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   -webkit-tap-highlight-color: transparent;
// `
//
// const style = {
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     p: 2,
//     px: 4,
//     pb: 3,
// }
//
//
// const Modal = ({ name, toggleModalState }) => {
//
//
//     if (name === 'Add Order') {
//         return (
//             <StyledModal
//                 aria-labelledby="unstyled-modal-title"
//                 aria-describedby="unstyled-modal-description"
//                 open={toggleModalState(name)}
//                 onClose={toggleModalState(name)}
//                 BackdropComponent={Backdrop}
//             >
//                 <Box sx={style}>
//                     <h2 id="unstyled-modal-title">Text in a modal</h2>
//                     <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
//                 </Box>
//             </StyledModal>
//         )
//     } else if (name === 'Add Trade') {
//         return (
//             <StyledModal
//                 aria-labelledby="unstyled-modal-title"
//                 aria-describedby="unstyled-modal-description"
//                 open={toggleModalState(name)}
//                 onClose={toggleModalState(name)}
//                 BackdropComponent={Backdrop}
//             >
//                 <Box sx={style}>
//                     <h2 id="unstyled-modal-title">Text in a modal</h2>
//                     <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
//                 </Box>
//             </StyledModal>
//         )
//     } else if (name === 'Add Stream') {
//         return (
//             <StyledModal
//                 aria-labelledby="unstyled-modal-title"
//                 aria-describedby="unstyled-modal-description"
//                 open={toggleModalState(name)}
//                 onClose={toggleModalState(name)}
//                 BackdropComponent={Backdrop}
//             >
//                 <Box sx={style}>
//                     <h2 id="unstyled-modal-title">Text in a modal</h2>
//                     <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
//                 </Box>
//             </StyledModal>
//         )
//     }
// }

const actions = [
    { icon: <CreateIcon />, name: 'Add Order', operation: 'order' },
    { icon: <AddchartIcon />, name: 'Add Trade', operation: 'trade' },
    { icon: <WavesIcon />, name: 'Add Stream', operation: 'stream' }
]


export default function BasicSpeedDial() {
    //MODAL STATE HANDLERS
    // const [modalStates, setModalStates] = React.useState({
    //     streamModalOpen: false,
    //     tradeModalOpen: false,
    //     orderModalOpen: false
    // })
    const dispatch = useDispatch()

    //
    const handleClick = (e, operation) => {
        e.preventDefault()
        if (operation === 'stream'){
            dispatch({type:'TOGGLE_STREAM'})
        } else if (operation === 'order') {
            dispatch({type:'TOGGLE_ORDER'})
        } else if (operation === 'trade') {
            dispatch({type:'TOGGLE_TRADE'})
        }
    }
    // console.log(modalStates)

    return (
        <>
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
                >
                    {actions.map((action) => (

                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}

                            onClick={e => {
                                handleClick(e, action.operation)
                            }}
                        />
                    ))}

                </SpeedDial>

            </Box>
            <Modal />
        </>
    )
}


//<Modal states={modalStates}/>
