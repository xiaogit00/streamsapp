import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import RightPane from './rightPane'
import LeftNav from 'components/leftNav/leftNav'
import currentPriceService from 'services/currentPriceService'
import { useSelector } from 'react-redux'
import Login from 'components/login'
import SignUp from 'components/signUp'


const clickHandler = async () => {
    const response = await currentPriceService.fetchPriceForStock('0700.XHKG')
    console.log(response)
}

const Routes = () => {
    console.log('Router entered')
    const loggedIn = useSelector(state => state.loggedIn)
    return (
        <>

            <Router>
                <Switch>
                    {/* Home Page */}
                    <Route exact path="/">
                        <LeftNav />
                        <div style={{fontFamily:'menlo',fontSize:'2em', margin:'30px'}}>Dashboard feature coming soon!</div>
                        <p style={{fontFamily:'menlo',fontSize:'1em', margin:'30px'}}> In the mean time, listen to some jazz while keying in your trades...</p>
                        <iframe style={{marginLeft:'30px'}} width="800" height="430" src="https://www.youtube.com/embed/u-32Wr8Gxzk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </Route>
                    {/* React Exercises Page */}
                    <Route path="/streams">
                        <LeftNav />
                        <RightPane type="streams"/>
                    </Route>
                    <Route path="/trades">
                        <LeftNav />
                        <RightPane type="trades"/>
                    </Route>
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
    
        </>
    )
}

export default Routes
