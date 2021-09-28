import React from 'react'
import './App.css'
import LeftNav from './components/leftNav'
import Routes from './components/routes'

const App = () => {
    return (
        <div className='container'>
            <LeftNav />
            <div className='page-wrapper'>
                <div className='right-pane'>
                    <Routes />
                </div>
            </div>

        </div>
    )
}

export default App
