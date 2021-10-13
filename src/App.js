import React from 'react'
import './App.css'
import Routes from 'components/routes'
import Login from 'components/login'
import { useState } from 'react'
import useToken from 'components/useToken'

const App = () => {
    console.log('app is rendered')
    // const token = useToken().token
    // console.log('useToken().token is called, and the value of token is', token)
    // const setToken = useToken().setToken
    // console.log('the value of token within App.js after setToken:',token)
    const { token, setToken } = useToken()
    if(!token) {
        console.log('if condition is triggered, and the value of token is:', token)
        return <Login setToken={setToken} />
    }

    return (
        <div className='container'>

            <div className='page-wrapper'>
                <div className='right-pane'>
                    <Routes />
                </div>
            </div>

        </div>
    )
}

export default App
