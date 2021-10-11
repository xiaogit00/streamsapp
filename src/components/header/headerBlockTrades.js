import React from 'react'
import 'App.css'
import styled from 'styled-components'
import ToggleButton from 'components/header/nominalCurrencyButton'

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
  font-size: 2vw;
  display:flex;
  align-items: center;
  font-style: italic;

`


//**********************************************
//*             Main Component
//**********************************************
const HeaderBlockTrades = () => {

    return(
        <div className="header-container">
            <HeaderLeftWrapper>

                <StreamLogoContainer style={headerFlexContainer}>
        Trades
                </StreamLogoContainer>



            </HeaderLeftWrapper>
        </div>
    )
}

export default HeaderBlockTrades
