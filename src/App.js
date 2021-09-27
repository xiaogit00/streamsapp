import React, { useEffect } from 'react'
import { initializeStreams } from './reducers/streamReducer'
import { useDispatch } from 'react-redux'
import './App.css';
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

export default App;
