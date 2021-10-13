import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import RightPane from './rightPane'
import LeftNav from 'components/leftNav/leftNav'


const Routes = () => {
    console.log('Router entered')
    return (
        <>
            <Router>
                <Switch>
                    {/* Home Page */}
                    <Route exact path="/">
                        <LeftNav />
                        <h1> This is within the develop branch. </h1>
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
                    <Route path="/login">
                        <RightPane type="login"/>
                    </Route>

                </Switch>
            </Router>
        </>
    )
}

export default Routes
