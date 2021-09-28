//**********************************************
//*             Documentation
//**********************************************
// The immediate container that sits inside LeftNav, contains the broad
// sections: Header, as well as other NavSections, which is the master section
// contains all other sections.
// Set to flex display, position fixed.
//
// Styled by App.css

import React from 'react'
import '../App.css'
import NavHeader from './navHeader'
import NavSections from './navSections'
// import MenuItems from './menuItems'



const NavigationMenu = () => {

    return (
        <div className='navigation-menu'>
            <NavHeader />
            <NavSections />
        </div>
    )
}

export default NavigationMenu
