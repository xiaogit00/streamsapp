import React from 'react'
import { useState } from 'react'
import 'App.css'
import styled from 'styled-components'
import { styled as styled1, Box } from '@mui/system'
import ModalUnstyled from '@mui/core/ModalUnstyled'
import ToggleButton from 'components/header/nominalCurrencyButton'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button'
import TradeModalForm from 'components/floatingActionButtonAdd/tradeModalForm'
import Notification from 'components/floatingActionButtonAdd/streamFormFields/notification'


//**********************************************
//*             Styled Components
//**********************************************
const HeaderLeftWrapper = styled.div`
  /* border: 1px dotted green; */
  width: 85%;
  align-items: flex-end;
  margin-bottom: 7px;
`
const headerFlexContainer = {
    height: '100%',

}

const StreamLogoContainer = styled.div`
  /* border: 1px dotted blue; */
  width: 10%;
  font-size: 1.4rem;
  display:flex;
  align-items: center;
  font-style: italic;
  font-family:menlo;
  color: black;
  margin-left: 1em;
`
const TradeModal = styled1(ModalUnstyled)`
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

const Backdrop = styled1('div')`
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

//**********************************************
//*             Main Component
//**********************************************
const HeaderBlockTrades = () => {
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationOpen, setNotificationOpen] = useState(false)
    const tradeNotifHandler = (asset) => {
        setNotificationMessage(`New trade created for ${asset}.`)
        setNotificationOpen(true)
    }

    const handleNotifClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }

        setNotificationOpen(false)
    }

    const dispatch = useDispatch()
    const modalStates = useSelector(state => state.modals)
    return(
        <div className="header-container">
            <HeaderLeftWrapper>

                <StreamLogoContainer style={headerFlexContainer}>
        Trades
                </StreamLogoContainer>


            </HeaderLeftWrapper>
            <Button variant="text"
                onClick={() => dispatch({type:'TOGGLE_TRADE'})}>
                Add Trade
            </Button>
            {modalStates.tradeModalOpen && (<TradeModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={modalStates.tradeModalOpen}
                onClose={() => dispatch({type: 'TOGGLE_TRADE'})}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <TradeModalForm notifHandler={tradeNotifHandler}/>
                </Box>
            </TradeModal>)}
            <Notification openState={notificationOpen} handleClose={handleNotifClose} notificationMessage={notificationMessage}/>
        </div>
    )
}

export default HeaderBlockTrades
