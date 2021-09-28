import React from 'react'
import 'App.css'
import styled from 'styled-components'

const TableRowProgressBarV2 = ({weights}) => {
// Using Styled components to get what I need

    // Pseudocode: Creating 4 components, each with hover elements.

    const WeightOpen = styled.div`
    background-color: #3E8CAA;
    width: ${weights.open}%;
    border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
    border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
    opacity: 15%;
    z-index: 2;
    :hover {
      background-color: #EDFBF5;
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
    :hover {
      background-color: black;
      cursor: pointer;
    }
  `
    const WeightSwapOpen = styled.div`
    background-color: #CA8534;
    width: ${weights.swapOpen}%;
    border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
    border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
    :hover {
      background-color: maroon;
      cursor: pointer;
    }
  `

    const WeightSwapClosed = styled.div`
    background-color: #7C7D7D;
    width: ${weights.swapClosed}%;
    border-top-right-radius: ${props => props.isLast ? '10px' : '0px' };
    border-bottom-right-radius: ${props => props.isLast ? '10px' : '0px' };
    :hover {
      background-color: black;
      cursor: pointer;
    }
  `

    // const weightOpenStyle = {
    //   backgroundColor: "#3E8CAA",
    //   // height: "3px",
    //   // borderRadius: "3px",
    //   width: `${weights.open}%`,
    //   // marginRight:"2px"
    // }
    //
    // const weightClosedStyle = {
    //   backgroundColor: "#7C7D7D",
    //   // height: "3px",
    //   // borderRadius: "3px",
    //   width: `${weights.closed}%`,
    //   // marginRight:"2px"
    // }
    //
    // const weightSwapOpen = {
    //   backgroundColor: "#CA8534",
    //   // height: "3px",
    //   // borderRadius: "3px",
    //   width: `${weights.swapOpen}%`,
    //   // marginRight:"2px"
    //
    // }
    //
    // const weightSwapClose = {
    //   backgroundColor: "#7C7D7D",
    //   // height: "3px",
    //   width: `${weights.swapClosed}%`,
    //   // marginRight:"2px"
    // }


    // weightSwapClose.borderTopRightRadius = "10px"
    // weightSwapClose.borderBottomRightRadius = "10px"
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
        <div className="table-row-progress-barV2-flex-container">
            <WeightOpen isLast={barIsLast.open}></WeightOpen>
            <WeightClosed isLast={barIsLast.closed}></WeightClosed>
            <WeightSwapOpen isLast={barIsLast.swapOpen}></WeightSwapOpen>
            <WeightSwapClosed isLast={barIsLast.swapClosed}></WeightSwapClosed>

        </div>
    )
}

export default TableRowProgressBarV2


// <div style={weightClosedStyle}>
// </div>
// <div style={weightOpenStyle}>
// </div>
// <div style={weightSwapOpen}>
// </div>
// <div style={weightSwapClose}>
// </div>
