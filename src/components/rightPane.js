import React from 'react'
import '../App.css'
import HeaderBlock from './headerBlock'
import ContentContainer from './contentContainer.js'

const RightPane = () => {

  return(

        <div className='right-pane-inner'>
          <HeaderBlock />
          <ContentContainer />
        </div>
  )
}

export default RightPane
