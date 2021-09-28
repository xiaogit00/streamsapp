//**********************************************
//*             Documentation
//**********************************************
// Individual section component. Gets passed individual section data.
// High level logic: If label = true, display label. else, display menuItems.

//Style notes:
// -Label Div and Label Text styled inline.
// -sectionClass is a variable that generates (.nav-section{N}-flexitem),
// styled by App.css

import React from 'react'
import '../App.css'
import MenuItems from './menuItems'

const NavSection = ({section}) => {
    //GENERATES THE CLASS ID TO BE PASSED INTO COMPONENT
    const sectionClass = 'flexbox-item nav-section' + section.id + '-flexitem'

    //*****************
    //*     STYLING
    //*****************
    const sectionLabelStyle = {
        height: '15px',
        paddingLeft: '35px',
        verticalAlign: 'text-top',
        display: 'inline-block',
        marginBottom: '15px'
    }
    const labelText = {
        fontFamily: 'gill sans',
        color: '#827188',
        fontSize: '10.5px'
    }
    //*****************
    //*     RENDERING
    //*****************
    //IF NO LABEL
    if (!section.label) {
        return (
            <div className={sectionClass}>
                <MenuItems menuItems={section.menuItems}/> {/*This will pass an array object
                                              with logoURL and text*/}
            </div>
        )
    }

    // IF GOT LABEL
    return (
        <div className={sectionClass}>
            <div style={sectionLabelStyle}>
                <span style={labelText}>{section.name}</span>
            </div>
            <MenuItems menuItems={section.menuItems}/>
        </div>
    )
}

export default NavSection
