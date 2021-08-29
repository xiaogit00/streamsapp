//**********************************************
//*             Documentation
//**********************************************
// Outer most container, class is left-nav within App.CSS.
// Has position absolute, width constraint for everythin within for 180px. 

import React from 'react'
import '../App.css';
import NavigationMenu from './navigationMenu'

const LeftNav = () => {


  return (
    <div className='left-nav'>
      <NavigationMenu />
    </div>
  )
}

export default LeftNav
