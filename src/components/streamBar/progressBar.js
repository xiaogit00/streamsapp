import React from 'react'
import styled from 'styled-components'
import '../../App.css'
var ReactFitText = require('react-fittext')

const ProgressBarStyled = styled.div`
/* border: 1px solid green; */
position: absolute;
width: 74.7%;
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
font-size:1.1 vw;
`

const WeightOpen = styled.div`
  background-color: #3E8CAA;
  width: ${props => props.weight}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  :hover {
    background-color: #ECF2F2;
    cursor: default;
    opacity: 100%;
    z-index: 3;
  }
  :hover .hover-text {
    visibility: visible;
  }
`

const WeightClosed = styled.div`
  background-color: #7C7D7D;
  width: ${props => props.weight}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  padding-top: 9px;
  padding-bottom: 9px;
  :hover {
    background-color: grey;
    cursor: default;
    opacity: 100%;
    z-index: 3;
  }
  :hover .hover-text {
    visibility: visible;
    color: white;
  }
`
const WeightSwapOpen = styled.div`
  background-color: #CA8534;
  width: ${props => props.weight}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;
  > span {
    color: blue;
    border: 2px solid black;
  }
  :hover {
    background-color: maroon;
    cursor: default;
    opacity: 100%;
    z-index: 3;
  }
  :hover .hover-text {
    visibility: visible;
  }
`

const WeightSwapClosed = styled.div`
  background-color: #945602;
  width: ${props => props.weight}%;
  border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
  opacity: 15%;
  z-index: 2;

  :hover {
    background-color: grey;
    cursor: default;
    opacity: 100%;
    z-index: 3;
  }
  :hover .hover-text {
    visibility: visible;
    color: white;
  }
`
const hoverStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}


const ProgressBar = ({weights, avgClosePrice, realizedReturns}) => {

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
    // const text = {
    //   visibility: "hidden"
    // }

    return (
        <ProgressBarStyled>
            <WeightOpen isLast={barIsLast.open} weight={weights.open} style={hoverStyle}>
                <span className="hover-text">{weights.open}% OPEN </span>
            </WeightOpen>
            <WeightClosed isLast={barIsLast.closed} weight={weights.closed} style={hoverStyle}>
                <span className="hover-text" style={{marginTop:'0.8em'}}>{weights.closed}% CLOSED <br/> <span style={{fontSize:'0.7vw'}}>@ ${avgClosePrice} avg ({realizedReturns}% ROI)</span></span>
            </WeightClosed>
            <WeightSwapOpen isLast={barIsLast.swapOpen} weight={weights.swapOpen} style={hoverStyle}>
                <span className="hover-text">{weights.swapOpen}% SWAP OPEN </span>
            </WeightSwapOpen>
            <WeightSwapClosed isLast={barIsLast.swapClosed} weight={weights.swapClosed} style={hoverStyle}>
                <span className="hover-text">{weights.swapClosed}% SWAP CLOSED</span>
            </WeightSwapClosed>
        </ProgressBarStyled>
    )
}

export default ProgressBar
