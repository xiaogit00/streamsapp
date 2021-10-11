import React from 'react'
import '../App.css'
import HeaderBlock from 'components/header/headerBlock'
import HeaderBlockTrades from 'components/header/headerBlockTrades'
import ContentContainer from 'components/contentContainer.js'
// var globalNominalDenom = require('../config.json').globalNominalDenom;

const RightPane = ({type}) => {

    if (type === 'streams') {
        return(

            <div className='right-pane-inner'>
                <HeaderBlock/>
                <ContentContainer type="streams"/>

            </div>
        )
    } else if (type === 'trades') {
        return (
            <div className='right-pane-inner'>
                <HeaderBlockTrades />
                <ContentContainer type="trades"/>

            </div>
        )
    }

}

export default RightPane
