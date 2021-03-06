import * as React from 'react'
import { styled, Box } from '@mui/system'
import ModalUnstyled from '@mui/core/ModalUnstyled'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import StreamModalForm from 'components/floatingActionButtonAdd/streamModalForm'
import TradeModalForm from 'components/floatingActionButtonAdd/tradeModalForm'
import Notification from 'components/floatingActionButtonAdd/streamFormFields/notification'

const StreamModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

`

const TradeModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OrderModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`

const style = {
    width: 315,
    bgcolor: 'white',
    borderRadius: '10px',
    height: '69vh'


}

const Modal = () => {
    // const [open, setOpen] = React.useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)
    const [notificationOpen, setNotificationOpen] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState('')
    const modalStates = useSelector(state => state.modals)
    const dispatch = useDispatch()

    // Notification
    const tradeNotifHandler = (asset) => {
        setNotificationMessage(`New trade created for ${asset}.`)
        setNotificationOpen(true)
    }

    const streamNotifHandler = (asset) => {
        setNotificationMessage(`New stream created for ${asset}.`)
        setNotificationOpen(true)
    }
    const handleNotifClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setNotificationOpen(false)
    }

    //Accessing: modalStates.streamModalOpen
    // console.log('This is Modal State from within Modal:', modalStates)
    if (Object.values(modalStates).includes(true)) {
        if (modalStates.streamModalOpen) {
            return (
                <StreamModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={modalStates.streamModalOpen}
                    onClose={() => dispatch({type: 'TOGGLE_STREAM'})}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style}>
                        <StreamModalForm notifHandler={streamNotifHandler}/>
                    </Box>
                </StreamModal>
            )
        } else if (modalStates.tradeModalOpen) {
            return (
                <>
                    <TradeModal
                        aria-labelledby="unstyled-modal-title"
                        aria-describedby="unstyled-modal-description"
                        open={modalStates.tradeModalOpen}
                        onClose={() => dispatch({type: 'TOGGLE_TRADE'})}
                        BackdropComponent={Backdrop}
                    >
                        <Box sx={style}>
                            <TradeModalForm notifHandler={tradeNotifHandler}/>
                        </Box>
                    </TradeModal>
                </>
            )
        } else if (modalStates.orderModalOpen) {
            return (
                <OrderModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={modalStates.orderModalOpen}
                    onClose={() => dispatch({type: 'TOGGLE_ORDER'})}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style}>
                        <h2 id="unstyled-modal-title"></h2>
                        <p id="unstyled-modal-description"></p>
                    </Box>
                </OrderModal>
            )
        } else {
            return null
        }

    } else {
        return (
            <Notification openState={notificationOpen} handleClose={handleNotifClose} notificationMessage={notificationMessage}/>
        )
    }
}

export default Modal
