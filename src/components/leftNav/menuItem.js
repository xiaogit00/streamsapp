import React from 'react'
import 'App.css'

const MenuItem = ({menuInfo}) => {
    const menuItemContainerStyle = {
    // border: '1px solid white',
        width: '90%',
        height: '30px',
        marginBottom: '5px',
        display: 'flex',
        backgroundColor: '#48145c',
        // opacity: '0.5',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingLeft: '10px',
        position:'relative'


    }
    const spanStyle = {
        position: 'absolute',
        width: '100%',
        height:'100%',
        top:0,
        left:0,
        zIndex: 1
    }

    const menuText = {
        fontFamily: 'Helvetica',
        color: '#FAF9FA',
        fontSize: '11px',
        // position: 'relative',
        // left: '-26px',
        bottom: '-2px',
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: '12px'
    }

    const logoutHandler = () => {
        window.localStorage.removeItem('token')
        window.location.reload()
    }



    return (

        <div style={menuItemContainerStyle}>
            <img src={menuInfo.logoUrl}
                height='20px' width='20px'
                alt="S logo"/>
            <span style={menuText}>{menuInfo.text}</span>
            {!menuInfo.notPage &&
                <a href={menuInfo.uri}><span style={spanStyle}></span> </a>
            }

            {menuInfo.notPage &&
                <a href={'/'} onClick={logoutHandler}><span style={spanStyle}></span> </a>
            }

        </div>

    )
}

export default MenuItem
