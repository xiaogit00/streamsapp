import React from 'react'
import styled from 'styled-components'

const ProgressBarStyled = styled.div`
/* border: 1px solid green; */
position: absolute;
/* width: 74.7%; */
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
min-height: 42px;
max-height: 50px;
right: 0;
margin-bottom: 3px;
margin-right: 10px;
/* margin-top: 7px; */
z-index: 2;
display: flex;
`

const WeightOpen = styled.div`
  background-color: #3E8CAA;
  width: ${weights.open}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  :hover {
    background-color: #ECF2F2;
    cursor: pointer;
    opacity: 100%;
    z-index: 3;
  }
`

const WeightClosed = styled.div`
  background-color: #7C7D7D;
  width: ${weights.closed}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  :hover {
    background-color: grey;
    cursor: pointer;
    opacity: 100%;
    z-index: 3;
  }
`
const WeightSwapOpen = styled.div`
  background-color: #CA8534;
  width: ${weights.swapOpen}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  :hover {
    background-color: maroon;
    cursor: pointer;
    opacity: 100%;
    z-index: 3;
  }
`

const WeightSwapClosed = styled.div`
  background-color: #7C7D7D;
  width: ${weights.swapClosed}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  :hover {
    background-color: grey;
    cursor: pointer;
    opacity: 100%;
    z-index: 3;
  }
`

const ProgressBar = ({weights}) => {
    console.log('PROGRESS BAR ENTERED')

    let barIsLast = {}

    if (weights.swapClosed > 1) {
        barIsLast.swapClosed = true
    } else {
        if (weights.swapOpen > 1) {
            barIsLast.swapOpen = true
        } else {
            if (weights.closed > 1) {
                barIsLast.closed = true
            } else {
                barIsLast.open = true
            }
        }
    }



    return (
        <ProgressBarStyled>
            <WeightOpen isLast={barIsLast.open}></WeightOpen>
            <WeightClosed isLast={barIsLast.closed}></WeightClosed>
            <WeightSwapOpen isLast={barIsLast.swapOpen}></WeightSwapOpen>
            <WeightSwapClosed isLast={barIsLast.swapClosed}></WeightSwapClosed>
        </ProgressBarStyled>
    )
}

export default ProgressBar
