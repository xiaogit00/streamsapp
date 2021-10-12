import * as React from 'react'
import { styled, Box } from '@mui/system'
import ModalUnstyled from '@mui/core/ModalUnstyled'
import { useSelector, useDispatch } from 'react-redux'
import StreamModalForm from 'components/floatingActionButtonAdd/streamModalForm'
import TradeModalForm from 'components/floatingActionButtonAdd/tradeModalForm'
import EditStreamModalForm from 'components/streamBar/editStreamModalForm'

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

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
  -webkit-tap-highlight-color: transparent;
`

const style = {
    width: 315,
    bgcolor: 'white',
    borderRadius: '10px',
    height: '69vh'


}

const EditStreamModal = () => {
    // const [open, setOpen] = React.useState(false)
    // const handleOpen = () => setOpen(true)
    // const handleClose = () => setOpen(false)
    const modalStates = useSelector(state => state.modals)
    const dispatch = useDispatch()

    if (modalStates.editStreamModalOpen.targettedStream) {
        return (
            <StreamModal

                open={modalStates.editStreamModalOpen}
                onClose={() => dispatch({type: 'TOGGLE_EDIT_STREAM'})}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <EditStreamModalForm />
                </Box>
            </StreamModal>
        )
    } else {
        return null
    }
}

export default EditStreamModal
