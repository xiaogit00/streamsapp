import React from 'react'
import './App.css'
import Routes from 'components/routes'
import Login from 'components/login'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useToken from 'components/useToken'
import SignUp from 'components/signUp'
import Verified from 'components/verified'

const App = () => {
    console.log('app is rendered')
    console.log('window.location.pathname:', window.location.pathname)
    // const token = useToken().token
    // console.log('useToken().token is called, and the value of token is', token)
    // const setToken = useToken().setToken
    // console.log('the value of token within App.js after setToken:',token)
    const { token, setToken } = useToken()
    // const loggedIn = useSelector(state => state.loggedIn)

    if(!token && (window.location.pathname !== '/signup' && window.location.pathname !== '/verified' )) {
        console.log('if condition is triggered, and the value of token is:', token)
        return <Login setToken={setToken} />

    } else if (!token && window.location.pathname === '/signup') {
        return <SignUp />
    } else if (!token && window.location.pathname === '/verified') {
        return <Verified />
    }

    return (
        <div className='container'>

            <div className='page-wrapper'>
                <div className='right-pane'>
                    <Routes/>
                </div>
            </div>

        </div>
    )
}

export default App
