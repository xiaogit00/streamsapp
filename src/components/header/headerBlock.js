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
  display: flex;
  justify-content: space-around;
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
const MenuContainer = styled.div`
  /* border: 1px dotted cyan; */
  width: 65%;
  display:flex;
  align-items: flex-end;
  justify-content:center;
`

const AssetFilter = styled.div `
  border: 2px solid grey;
  width: 90%;
  height: 5vh;
`

const ButtonContainer = styled.div`
  /* border: 3px solid grey; */
  width: 130px;
  margin-right: 20px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content:center;
  /* border-radius: 12px; */
`


//**********************************************
//*             Main Component
//**********************************************
const HeaderBlock = ({globalDenom, onChange}) => {

    return(
        <div className="header-container">
            <HeaderLeftWrapper>

                <StreamLogoContainer style={headerFlexContainer}>
        Streams
                </StreamLogoContainer>

                <MenuContainer style={headerFlexContainer}>
                    <AssetFilter></AssetFilter>
                </MenuContainer>

                <ButtonContainer>
                    <ToggleButton globalDenom={globalDenom} onChange={onChange}/>
                </ButtonContainer>

            </HeaderLeftWrapper>
        </div>
    )
}

export default HeaderBlock
