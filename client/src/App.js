import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import CouchWatch from "./components/Watch";
import Home from './components/Home';
import NoMatch from './components/NoMatch';

const App = () => (
  
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/watch" component={CouchWatch} />
    <Route component={NoMatch} />
  </Switch>

)

export default App;