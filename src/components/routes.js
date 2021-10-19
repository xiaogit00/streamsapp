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
                        <h1> This is within the develop branch. </h1>
                        <button onClick={clickHandler}>Click me to test</button>
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
