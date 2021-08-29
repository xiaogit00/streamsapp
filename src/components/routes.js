import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import RightPane from './rightPane'


const Routes = () => {
  console.log("Router entered")
  return (
    <>
      <Router>
        <Switch>
        {/* Home Page */}
          <Route exact path="/">
            <h1> This is 1234 placeholder for the home page</h1>
          </Route>
          {/* React Exercises Page */}
          <Route path="/streams">
            <RightPane />
          </Route>

        </Switch>
      </Router>
    </>
  )
}

export default Routes;
