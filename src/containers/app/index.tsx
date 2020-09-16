import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../home'

const App = () => (
  <div>
    <main>
      <Switch>
      <Route exact path="/" component={Home} />
      <Redirect from="*" to="/"/>
      </Switch>
      
    </main>
  </div>
)

export default App
