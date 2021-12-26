import React from 'react'
import 'App.css'

const HelperDialogue = ({sortedTrades}) => {
    if (true && sortedTrades.length === 0) {
        return (
            <div className="trades-helper-container-flex">
                <p className="trades-helper-dialogue">You have not added any trades. Click on the button above to add a trade!</p>
            </div>
        )
    } else {
        return null
    }
}

export default HelperDialogue
