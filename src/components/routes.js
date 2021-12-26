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

// const logoutHandler = () => {
//     window.localStorage.removeItem('token')
//     window.location.reload()
// }

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
                        <div style={{fontFamily:'menlo',fontSize:'2em', margin:'30px'}}>How to use Streams</div>
                        <p style={{fontFamily:'menlo',fontSize:'1em', margin:'30px'}}>
                            1. Add a new trade <br /> <br />
                            2. Put your trade into a stream <br /> <br />
                            3. View your stream returns! <br /> <br />
                            4. Add another trade of same asset. <br /> <br />
                            5. Add that trade into stream. <br /> <br />
                            6. View your overall returns for asset. 
                        </p>

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
