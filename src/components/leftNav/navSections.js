//**********************************************
//*             Documentation
//**********************************************
// NavSections, Each contains a broad section.
//
// IMPT: the data for each section is defined here. Think of it as
// where you define a group of menus. Within each item contains the
// logoUrl, as well as the text to be displayed.

// Within my current site configuration, there are three broad sections defined.

//JSX calls a NavSection component, which is the individual Section for rendering.
// The section data is passed into each component.
import React from 'react'
import 'App.css'
import NavSection from 'components/leftNav/navSection'

const NavSections = () => {

    const logoutHandler = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }

    const section1 = {
        id: 1,
        label: false,
        menuItems: [{
            logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1629778502/home_1_wchsca.png',
            text: 'Dashboard',
            uri: '/'
        }]
    }

    const section2 = {
        id: 2,
        label: true,
        name: 'TRACK',
        menuItems: [{
            logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1629781853/waves_w7pkfq.png',
            text: 'Streams',
            uri: '/streams'
        }, {
            logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1629781868/stock_pau4cd.png',
            text: 'Trades',
            uri: '/trades'
        },
        // {
        //     logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1629787495/order_1_n5khi0.png',
        //     text: 'Orders',
        //     url: '/orders'
        // }
        ]
    }

    const section3 = {
        id: 3,
        label: true,
        name: 'OVERVIEW',
        menuItems: [{
            logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1629787638/dollar-symbol_u6h55w.png',
            text: 'Assets (Coming soon!)'
        }]
    }

    const section4 = {
        id:4,
        label: false,
        name: 'loggedInUser',
        menuItems: [{
            logoUrl: 'https://res.cloudinary.com/dl4murstw/image/upload/v1638760878/user_1_b87gap.png',
            text: 'Logout',
            notPage: true
        }]
    }
    // <button onClick={logoutHandler}>Log Out</button>

    return (
        <>
            <NavSection section={section1} />
            <NavSection section={section2} />
            <NavSection section={section3} />
            <NavSection section={section4} />


        </>
    )
}

export default NavSections
