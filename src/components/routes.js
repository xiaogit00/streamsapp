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
                        <div style={{fontFamily:'menlo',fontSize:'2em', margin:'60px'}}>
                            Watch this video to learn how to use Streams!
                            <iframe width="888.8" height="500" src="https://www.youtube.com/embed/BWv0N0ONSa8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>


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
