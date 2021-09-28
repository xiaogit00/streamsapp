import '../App.css'
import HeaderBlock from './headerBlock'
import ContentContainer from './contentContainer.js'
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
