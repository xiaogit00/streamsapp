import React from 'react'
import '../App.css'
import HeaderBlock from 'components/header/headerBlock'
import ContentContainer from 'components/contentContainer.js'
// var globalNominalDenom = require('../config.json').globalNominalDenom;

const RightPane = () => {


    return(

        <div className='right-pane-inner'>
            <HeaderBlock/>
            <ContentContainer />

        </div>
    )
}

export default RightPane
