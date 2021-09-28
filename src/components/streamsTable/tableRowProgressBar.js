import React from 'react'
import '../App.css'

const TableRowProgressBar = () => {
    //Here, the pseudocode is this.
    // I'll need to generate as many flex items as there are weights.
    // <div class = WeightOpen >
    // <div class = WeightClosed>
    // <div class = weightSwap>
    const weightOpenStyle = {
        backgroundColor: '#3E8CAA',
        height: '3px',
        borderRadius: '3px',
        width: '50%',
        marginRight:'2px'
    }

    const weightClosedStyle = {
        backgroundColor: '#7C7D7D',
        height: '3px',
        borderRadius: '3px',
        width: '20%',
        marginRight:'2px'
    }

    const weightSwapOpen = {
        backgroundColor: '#CA8534',
        height: '3px',
        borderRadius: '3px',
        width: '10%',
        marginRight:'2px'
    }

    const weightSwapClose = {
        backgroundColor: '#7C7D7D',
        height: '3px',
        borderRadius: '3px',
        width: '20%',
        marginRight:'2px'
    }
    return (
        <div className="table-row-progress-bar-flex-container">
            <div style={weightClosedStyle}>
            </div>
            <div style={weightOpenStyle}>
            </div>
            <div style={weightSwapOpen}>
            </div>
            <div style={weightSwapClose}>
            </div>

        </div>
    )
}

export default TableRowProgressBar
